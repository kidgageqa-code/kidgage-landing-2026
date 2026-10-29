// Kidgage registration notification — SMTP plus persistent Netlify Blobs counter.

const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );

const get = (details, key, fallback = "—") =>
  details.find(([name]) => name === key)?.[1] || fallback;

function qatarTime(isoDate) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Time unavailable";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Qatar",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(",", "");
}

const row = ([key, value]) => `
<tr>
  <td style="padding:12px 8px 12px 0;border-bottom:1px solid #e5ece4;vertical-align:top;width:39%;font:600 12px/19px Arial,Helvetica,sans-serif;color:#708273;">${escape(key)}</td>
  <td style="padding:12px 0;border-bottom:1px solid #e5ece4;vertical-align:top;font:700 13px/20px Arial,Helvetica,sans-serif;color:#253d30;overflow-wrap:anywhere;word-break:break-word;">${escape(value || "—")}</td>
</tr>`;

const section = (name, rows) => `
<tr><td style="padding:24px 0 10px;font:800 11px/18px Arial,Helvetica,sans-serif;letter-spacing:1.6px;color:#83a27c;">${escape(name.toUpperCase())}</td></tr>
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows.map(row).join("")}</table></td></tr>`;

export function makeRegistrationEmail({ type, details }) {
  const parent = type === "kidgage-parents";
  const kind = parent ? "Parent" : "Academy";
  const registrationNumber = get(details, "Registration Form No.");
  const received = qatarTime(get(details, "Registration date (UTC)", ""));
  const primaryFields = parent
    ? ["Full name", "Parent type", "Phone", "Email"]
    : ["Academy name", "Contact person", "Phone", "Email"];
  const fields = (names) => details.filter(([name]) => names.includes(name));
  const childRows = details.filter(([name]) => /^Child \d+$/.test(name));
  const extras = parent
    ? [["Children count", get(details, "Children count", "0")], ...childRows]
    : fields(["Category", "Area", "Website or Instagram"]);
  const tracking = fields([
    "Language",
    "source",
    "utmSource",
    "utmMedium",
    "utmCampaign",
  ]);
  const sections = [
    ["Contact details", fields(primaryFields)],
    [parent ? "Children information" : "Academy information", extras],
    [
      "Submission information",
      [
        ["Registration Form No.", registrationNumber],
        ["Received (Qatar)", received],
        ...tracking,
      ],
    ],
  ];

  // Publicly hosted brand asset. Relative /assets/... paths do not work in email.
  // Some email clients block SVG; publishing a PNG at this URL is recommended.
  const logoUrl = "https://kidgage.com/assets/kidgage-logo.svg";
  const subject = `Kidgage | ${kind} Registration Form No. ${registrationNumber} | ${received} Qatar`;
  const intro = `A new ${kind.toLowerCase()} registration has arrived.`;

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(subject)}</title></head>
<body style="margin:0;padding:0;background:#f8faf6;color:#253d30;font-family:Arial,Helvetica,sans-serif;">
<div style="display:none;font-size:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escape(intro)} ${escape(received)} Qatar · ${escape(registrationNumber)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8faf6;"><tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#ffffff;border:1px solid #e0e8dc;border-radius:18px;">
<tr><td style="padding:26px 32px;background:#ffffff;border-bottom:3px solid #83a27c;border-radius:18px 18px 0 0;">
  <img src="${escape(logoUrl)}" width="210" alt="Kidgage" style="display:block;width:210px;max-width:100%;height:auto;color:#253d30;font-size:25px;font-weight:800;" />
  <div style="padding-top:13px;font-size:10px;font-weight:700;letter-spacing:2px;color:#789b70;">REGISTRATION ALERT</div>
</td></tr>
<tr><td style="padding:29px 32px 8px;">
  <span style="display:inline-block;background:#edf3e9;color:#476a4b;border-radius:20px;padding:7px 12px;font-size:10px;font-weight:800;letter-spacing:1.5px;">${parent ? "PARENTS" : "ACADEMIES"}</span>
  <h1 style="font-size:27px;line-height:35px;margin:16px 0 9px;color:#253d30;">New ${escape(kind)} Registration</h1>
  <p style="margin:0 0 17px;color:#738476;font-size:13px;line-height:21px;">${escape(intro)} Reply to this email to contact the registrant.</p>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f0f5ed;border:1px solid #dfe9da;border-radius:12px;">
    <tr><td style="padding:16px 18px;">
      <div style="color:#698669;font-size:10px;letter-spacing:1.5px;font-weight:800;">RECEIVED IN QATAR</div>
      <div style="padding-top:5px;font-weight:800;font-size:19px;line-height:27px;color:#253d30;">${escape(received)}</div>
      <div style="padding-top:5px;font-size:11px;line-height:17px;color:#708273;overflow-wrap:anywhere;">Registration Form No. ${escape(registrationNumber)}</div>
    </td></tr>
  </table>
</td></tr>
<tr><td style="padding:0 32px 30px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${sections.map(([title, entries]) => section(title, entries)).join("")}</table></td></tr>
<tr><td style="padding:18px 32px;background:#f4f8f1;border-top:1px solid #e0e8dc;border-radius:0 0 18px 18px;color:#738476;font-size:11px;line-height:18px;">Kidgage · Coming soon in Qatar<br>Internal registration notification. Handle personal information confidentially.</td></tr>
</table></td></tr></table></body></html>`;

  const text = `KIDGAGE — NEW ${kind.toUpperCase()} REGISTRATION\nReceived (Qatar): ${received}\nRegistration Form No. ${registrationNumber}\n\n${sections.map(([title, entries]) => `${title.toUpperCase()}\n${entries.map(([key, val]) => `${key}: ${val || "—"}`).join("\n")}`).join("\n\n")}\n\nReply to this email to contact the registrant.`;
  return { subject, html, text };
}
