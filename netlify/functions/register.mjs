import nodemailer from 'nodemailer';
import { getStore } from '@netlify/blobs';
import { makeRegistrationEmail } from '../../emailTemplate.js';

export const config = { path: '/api/register', method: ['POST'] };

const json = (data, status = 200) => Response.json(data, {
  status,
  headers: { 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' },
});
const clean = (value, max = 200) => typeof value === 'string'
  ? value.trim().slice(0, max).replace(/[\x00-\x1f\x7f]/g, ' ') : '';
const emailIsValid = value => value.length <= 160 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
function phoneDigits(value) {
  let digits = clean(value, 30).replace(/\D/g, '');
  if (digits.startsWith('00974')) digits = digits.slice(5);
  if (digits.startsWith('974') && digits.length === 11) digits = digits.slice(3);
  return /^[3567]\d{7}$/.test(digits) ? digits : null;
}
const categories = new Set(['Sports & Fitness', 'Arts & Creativity', 'Music & Dance', 'STEM & Learning', 'Wellness & Movement', 'Other', '']);


// Persistent, site-wide counters. Conditional updates protect against concurrent requests.
// Parent and Academy sequences are independent and never reset on redeploy.
async function nextRegistrationNumber(kind) {
  const store = getStore({ name: 'kidgage-registration-counters', consistency: 'strong' });
  const key = `sequence-${kind}`;
  for (let attempt = 0; attempt < 25; attempt++) {
    const existing = await store.getWithMetadata(key, { type: 'text', consistency: 'strong' });
    const previous = existing ? Number(existing.data) : 0;
    if (!Number.isSafeInteger(previous) || previous < 0) throw new Error('Invalid registration counter');
    const next = previous + 1;
    const result = await store.set(key, String(next), existing
      ? { onlyIfMatch: existing.etag }
      : { onlyIfNew: true });
    if (result.modified) return `#${String(next).padStart(3, '0')}`;
    await new Promise(resolve => setTimeout(resolve, 15 + attempt * 12));
  }
  throw new Error('Unable to reserve registration number');
}

export default async (request) => {
  const contentType = request.headers.get('content-type') || '';
  const length = Number(request.headers.get('content-length') || 0);
  if (length > 25000) return json({ error: 'Request too large.' }, 413);
  let body;
  try {
    const raw = await request.text();
    if (raw.length > 25000) return json({ error: 'Request too large.' }, 413);
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const params = new URLSearchParams(raw);
      if ([...params.keys()].length > 40) return json({ error: 'Invalid request.' }, 400);
      body = Object.fromEntries(params);
    } else if (contentType.includes('application/json')) {
      body = JSON.parse(raw);
    } else return json({ error: 'Unsupported content type.' }, 415);
  } catch { return json({ error: 'Invalid request.' }, 400); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ error: 'Invalid request.' }, 400);
  if (body.company_website) return json({ ok: true });
  const type = body['form-name'];
  if (!['kidgage-parents','kidgage-academies'].includes(type)) return json({ error: 'Unknown registration form.' }, 400);
  if (!['yes','on'].includes(body.consent)) return json({ error: 'Consent is required.' }, 400);
  const email = clean(body.email, 161).toLowerCase();
  const mobile = phoneDigits(body.mobile);
  if (!emailIsValid(email)) return json({ error: 'Enter a valid email address.' }, 400);
  if (!mobile) return json({ error: 'Enter a valid Qatar mobile number.' }, 400);
  const parent = type === 'kidgage-parents';
  const details = [
    ['Registration date (UTC)', new Date().toISOString()],
    ['Registration type', parent ? 'Parent waitlist' : 'Academy registration'],
  ];
  if (parent) {
    const name = clean(body.fullName, 100), parentType = clean(body.parentType, 20);
    if (name.length < 2 || !['Mother','Father'].includes(parentType)) return json({ error: 'Complete the parent details.' }, 400);
    let children;
    try { children = body.children ? JSON.parse(body.children) : []; }
    catch { return json({ error: 'Invalid child details.' }, 400); }
    if (!Array.isArray(children) || children.length > 8) return json({ error: 'Invalid child details.' }, 400);
    const validGenders = new Set(['','Boy','Girl','Prefer not to say']);
    const sanitized = [];
    for (const child of children) {
      if (!child || typeof child !== 'object' || Array.isArray(child)) return json({ error: 'Invalid child details.' }, 400);
      const childName = clean(child.name, 70), age = clean(child.age, 2), gender = clean(child.gender, 30);
      if (!childName || !/^(?:[1-9]|1[0-8])$/.test(age) || !validGenders.has(gender)) return json({ error: 'Invalid child details.' }, 400);
      sanitized.push({ name: childName, age, gender });
    }
    details.push(['Full name',name], ['Parent type',parentType], ['Children count', String(sanitized.length)]);
    sanitized.forEach((child,i) => details.push([`Child ${i+1}`,`Name: ${child.name}; Age: ${child.age}; Gender: ${child.gender || 'Not specified'}`]));
  } else {
    const academy = clean(body.academyName,140), contact = clean(body.contactName,100), category = clean(body.category,50);
    if (academy.length < 2 || contact.length < 2) return json({ error: 'Complete the academy details.' }, 400);
    if (!categories.has(category)) return json({ error: 'Invalid activity category.' }, 400);
    details.push(['Academy name',academy], ['Contact person',contact], ['Category',category || 'Not supplied'], ['Area',clean(body.area,100)], ['Website or Instagram',clean(body.website,200)]);
  }
  details.push(['Phone',`+974 ${mobile}`], ['Email',email], ['Language',clean(body.language,10)]);
  for (const key of ['source','utmSource','utmMedium','utmCampaign']) details.push([key,clean(body[key],200)]);
  const required = ['SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASS','SMTP_FROM','NOTIFY_EMAIL'];
  if (required.some(key => !process.env[key])) {
    console.error('Missing SMTP environment configuration.');
    return json({ error: 'Registration email is temporarily unavailable.' }, 503);
  }
  const port = Number(process.env.SMTP_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) return json({ error: 'SMTP configuration error.' }, 503);
  // Reserve only after all validation and SMTP configuration checks pass.
  // Numbers are unique; an SMTP failure after reservation may leave a gap.
  let registrationNumber;
  try {
    registrationNumber = await nextRegistrationNumber(parent ? 'parent' : 'academy');
  } catch (err) {
    console.error('Registration counter failed:', err?.message || 'unknown');
    return json({ error: 'Registration service is temporarily unavailable. Please try again.' }, 503);
  }
  details.unshift(['Registration Form No.', registrationNumber]);
  const {subject,text,html} = makeRegistrationEmail({type,details});
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port,
    secure: process.env.SMTP_SECURE === 'true' || (process.env.SMTP_SECURE !== 'false' && port === 465),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
  });
  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM, to: process.env.NOTIFY_EMAIL,
      replyTo: email, subject, text, html,
    });
    return json({ ok: true, registrationNumber });
  } catch (err) {
    console.error('SMTP registration failed:', err?.code || err?.message || 'unknown');
    return json({ error: 'Registration could not be emailed. Please try again.' }, 503);
  } finally { transport.close(); }
};
