// Transactional registration notification for Kidgage staff.
// Email-safe, responsive table layout. All user-provided content is HTML-escaped.
const escape = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[c]);

const sectionTitle = (name) => `<tr><td style="padding:24px 0 9px;font-size:11px;line-height:18px;letter-spacing:1.8px;font-weight:800;color:#789b70;text-transform:uppercase;">${escape(name)}</td></tr>`;
const row = ([key, value]) => `<tr><td style="padding:12px 0;border-bottom:1px solid #e9efe7;vertical-align:top;width:36%;font-size:12px;line-height:19px;color:#758578;font-weight:600;">${escape(key)}</td><td style="padding:12px 0;border-bottom:1px solid #e9efe7;vertical-align:top;font-size:13px;line-height:20px;color:#263f30;font-weight:700;word-break:break-word;">${escape(value || '—')}</td></tr>`;
const section = (title, entries) => `${sectionTitle(title)}<tr><td><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">${entries.map(row).join('')}</table></td></tr>`;
const asText = (title, entries) => `\n${title}\n${'-'.repeat(title.length)}\n${entries.map(([k,v]) => `${k}: ${v || '—'}`).join('\n')}\n`;

export function makeRegistrationEmail({ type, details }) {
  const parent = type === 'kidgage-parents';
  const title = parent ? 'New parent waitlist registration' : 'New academy registration';
  const subtype = parent ? 'PARENT WAITLIST' : 'ACADEMY PARTNERSHIP';
  const leadId = details.find(([k]) => k === 'Lead ID')?.[1] || '—';
  const registered = details.find(([k]) => k === 'Registration date (UTC)')?.[1] || '—';
  const primary = parent ? ['Full name', 'Parent type', 'Phone', 'Email'] : ['Academy name', 'Contact person', 'Phone', 'Email'];
  const fields = (names) => details.filter(([k]) => names.includes(k));
  const children = details.filter(([k]) => /^Child \d+$/.test(k));
  const extras = parent ? [['Children count', details.find(([k]) => k === 'Children count')?.[1] || '0'], ...children] : fields(['Category', 'Area', 'Website or Instagram']);
  const tracking = fields(['Language','source','utmSource','utmMedium','utmCampaign']);
  const sections = [ ['Contact details', fields(primary)], [parent ? 'Children information' : 'Academy information', extras], ['Submission information', [['Lead ID',leadId], ['Received (UTC)',registered], ...tracking]] ];
  const subject = `Kidgage | ${parent ? 'Parent' : 'Academy'} registration | ${leadId}`;
  const inner = sections.map(([header, values]) => section(header, values)).join('');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(title)}</title></head><body style="margin:0;padding:0;background:#f8faf6;color:#263f30;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;font-size:1px;color:#f8faf6;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escape(title)} — ${escape(leadId)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f8faf6;"><tr><td align="center" style="padding:32px 14px;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#ffffff;border:1px solid #e1e9dd;border-radius:18px;overflow:hidden;">
  <tr><td style="padding:27px 34px;background:#263f30;"><div style="font-size:28px;letter-spacing:-1px;color:#ffffff;font-weight:800;">kidgage<span style="color:#efaa76;">.</span></div><div style="padding-top:7px;font-size:11px;letter-spacing:2px;font-weight:700;color:#bfd5bc;">REGISTRATION NOTIFICATION</div></td></tr>
  <tr><td style="padding:32px 34px 12px;"><div style="display:inline-block;padding:7px 11px;border-radius:20px;background:#edf3e9;color:#47684c;font-size:10px;letter-spacing:1.2px;font-weight:800;">${subtype}</div><h1 style="margin:17px 0 9px;font-size:26px;line-height:34px;letter-spacing:-0.8px;color:#263f30;">${escape(title)}</h1><p style="margin:0;font-size:13px;line-height:21px;color:#718274;">A new Kidgage registration has been submitted. Review the details below and reply to this email to contact the registrant.</p></td></tr>
  <tr><td style="padding:0 34px 26px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">${inner}</table></td></tr>
  <tr><td style="padding:19px 34px;background:#f4f8f1;border-top:1px solid #e1e9dd;font-size:11px;line-height:18px;color:#718274;">Kidgage · Coming soon in Qatar<br>Internal registration notification. Handle personal information confidentially.</td></tr>
  </table></td></tr></table></body></html>`;
  const text = `KIDGAGE — ${title}\n${'='.repeat(40)}\nThis is an internal registration notification.\n` + sections.map(([heading, entries]) => asText(heading, entries)).join('') + '\nReply to this email to contact the registrant.\n';
  return { subject, html, text };
}
