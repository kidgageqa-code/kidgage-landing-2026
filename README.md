# Kidgage — SMTP Email Only

## What changed
- Every valid Parent or Academy registration goes to `NOTIFY_EMAIL` through your SMTP provider.
- No Excel file, Google Sheets, or database is used. No registration records are saved to disk.
- Landing page HTML, CSS, translation, logo assets, and form JavaScript are preserved.
- The website waits for the SMTP server to accept an email before showing success. SMTP acceptance does **not** guarantee delivery to the recipient inbox.

## Run
1. Unzip into a NEW project folder, or back up and replace the files in your current project.
2. Copy your existing `privacy.html` into the folder (its source wasn't supplied).
3. `npm install`
4. `cp .env.example .env`
5. Edit `.env` with real SMTP settings (never commit it).
6. `npm run check` then `npm run dev`.
7. Open http://localhost:8000 and submit one parent and one academy entry.
8. Verify notifications in the configured inbox and check Spam if necessary.

### Gmail example
Use `smtp.gmail.com`, port `465`, secure `true`, your Gmail address, and a Google App Password if available. Normal Google passwords typically don't work for SMTP. Provider-specific rules may differ.

### Hosting
Run this as a persistent Node.js application, not a static-only site. Use HTTPS and configure environment variables in hosting, not frontend code. Email messages are **not** a searchable CRM database; inbox organization and backups remain your responsibility. Consider minimizing child details or limiting access to that mailbox.

### Troubleshooting
- `GET /api/health` returns `{ "ok": true, "storage": "smtp-email-only" }`.
- `GET /assets/kidgage-logo.svg` should show the logo.
- SMTP 503 usually indicates bad credentials, blocked SMTP networking, or email provider rejection; check server logs.
- Copy `privacy.html` from the original project, since it wasn't included in supplied materials.
