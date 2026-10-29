import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import { makeRegistrationEmail } from './emailTemplate.js';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'NOTIFY_EMAIL'];
const missing = required.filter(key => !process.env[key]);
if (missing.length) throw new Error(`Missing SMTP settings: ${missing.join(', ')}`);
const smtpPort = Number(process.env.SMTP_PORT);
if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) throw new Error('Invalid SMTP_PORT');
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: process.env.SMTP_SECURE === 'true' || (process.env.SMTP_SECURE !== 'false' && smtpPort === 465),
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  connectionTimeout: 12000,
  greetingTimeout: 12000,
  socketTimeout: 20000,
});
const app = express();
app.disable('x-powered-by');
if (process.env.TRUST_PROXY === '1') app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.urlencoded({ extended: false, limit: '25kb', parameterLimit: 40 }));
app.use(express.json({ limit: '25kb' }));
app.use('/api/register', rateLimit({
  windowMs: 15 * 60 * 1000, limit: 10,
  standardHeaders: 'draft-7', legacyHeaders: false,
  message: { error: 'Too many attempts. Please try again later.' },
}));
const clean = (value, max = 200) => typeof value === 'string'
  ? value.trim().slice(0, max).replace(/[\x00-\x1f\x7f]/g, ' ') : '';
const emailIsValid = value => value.length <= 160 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const phoneDigits = value => {
  let digits = clean(value, 30).replace(/\D/g, '');
  if (digits.startsWith('00974')) digits = digits.slice(5);
  if (digits.startsWith('974') && digits.length === 11) digits = digits.slice(3);
  return /^[3567]\d{7}$/.test(digits) ? digits : null;
};
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const bad = (res, message) => res.status(400).json({ error: message });
const categories = new Set(['Sports & Fitness', 'Arts & Creativity', 'Music & Dance', 'STEM & Learning', 'Wellness & Movement', 'Other', '']);

app.post('/api/register', async (req, res) => {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) return bad(res, 'Invalid request.');
  if (body.company_website) return res.json({ ok: true }); // discard bot submissions
  const type = body['form-name'];
  if (!['kidgage-parents', 'kidgage-academies'].includes(type)) return bad(res, 'Unknown registration form.');
  if (!['on', 'yes'].includes(body.consent)) return bad(res, 'Consent is required.');
  const email = clean(body.email, 161).toLowerCase();
  const mobile = phoneDigits(body.mobile);
  if (!emailIsValid(email)) return bad(res, 'Enter a valid email address.');
  if (!mobile) return bad(res, 'Enter a valid Qatar mobile number.');

  const parent = type === 'kidgage-parents';
  const id = `${parent ? 'PAR' : 'ACA'}-${randomUUID()}`;
  const details = [
    ['Lead ID', id], ['Registration date (UTC)', new Date().toISOString()],
    ['Registration type', parent ? 'Parent waitlist' : 'Academy registration'],
  ];
  if (parent) {
    const name = clean(body.fullName, 100);
    const parentType = clean(body.parentType, 20);
    if (name.length < 2 || !['Mother', 'Father'].includes(parentType)) return bad(res, 'Complete the parent details.');
    let children;
    try { children = body.children ? JSON.parse(body.children) : []; }
    catch { return bad(res, 'Invalid child details.'); }
    if (!Array.isArray(children) || children.length > 8) return bad(res, 'Invalid child details.');
    const validGenders = new Set(['', 'Boy', 'Girl', 'Prefer not to say']);
    const sanitized = [];
    for (const child of children) {
      if (!child || typeof child !== 'object' || Array.isArray(child)) return bad(res, 'Invalid child details.');
      const childName = clean(child.name, 70);
      const age = clean(child.age, 2);
      const gender = clean(child.gender, 30);
      if (!childName || !/^(?:[1-9]|1[0-8])$/.test(age) || !validGenders.has(gender)) return bad(res, 'Invalid child details.');
      sanitized.push({ name: childName, age, gender });
    }
    details.push(['Full name', name], ['Parent type', parentType], ['Children count', String(sanitized.length)]);
    sanitized.forEach((child, i) => details.push([`Child ${i + 1}`, `Name: ${child.name}; Age: ${child.age}; Gender: ${child.gender || 'Not specified'}`]));
  } else {
    const academy = clean(body.academyName, 140);
    const contact = clean(body.contactName, 100);
    const category = clean(body.category, 50);
    if (academy.length < 2 || contact.length < 2) return bad(res, 'Complete the academy details.');
    if (!categories.has(category)) return bad(res, 'Invalid activity category.');
    details.push(['Academy name', academy], ['Contact person', contact], ['Category', category || 'Not supplied'], ['Area', clean(body.area, 100)], ['Website or Instagram', clean(body.website, 200)]);
  }
  details.push(['Phone', `+974 ${mobile}`], ['Email', email], ['Language', clean(body.language, 10)]);
  for (const key of ['source', 'utmSource', 'utmMedium', 'utmCampaign']) {
    details.push([key, clean(body[key], 200)]);
  }
  const { subject, text, html } = makeRegistrationEmail({ type, details });
  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.NOTIFY_EMAIL,
      replyTo: email,
      subject, text, html,
    });
    res.json({ ok: true, leadId: id });
  } catch (err) {
    console.error('SMTP submission failed:', err?.code || err?.message || 'unknown error');
    res.status(503).json({ error: 'Registration could not be sent. Please try again.' });
  }
});
app.get('/api/health', (_req, res) => res.json({ ok: true, storage: 'smtp-email-only' }));
app.get('/', (_req, res) => res.sendFile(join(root, 'index.html')));
app.use('/assets', express.static(join(root, 'assets'), { dotfiles: 'deny', index: false }));
for (const filename of ['app.js', 'styles.css', 'privacy.html', 'robots.txt', 'favicon.svg']) {
  app.get('/' + filename, (_req, res) => res.sendFile(join(root, filename), err => {
    if (err && !res.headersSent) res.status(404).end();
  }));
}
app.use((_req, res) => res.status(404).send('Not found'));
const port = Number(process.env.PORT || 8000);
app.listen(port, () => console.log(`Kidgage SMTP website running at http://localhost:${port}`));
