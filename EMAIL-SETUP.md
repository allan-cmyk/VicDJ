# Booking email setup (admin runbook — Allan only)

> Claude Code: this file is for the site admin. Don't walk Vic through it.

The booking form validates input, blocks bots (honeypot), and the API route emails a styled
inquiry to `BOOKING_TO_EMAIL` with reply-to set to the requester. In production, if
`RESEND_API_KEY` is missing the route returns a 503 telling visitors to call/text/DM
instead of silently dropping the lead.

Plan: send **from** `booking@djtr3y.com` (verified in Resend) **to** Vic's main Google
Workspace address on djtr3y.com.

## 1. Resend account + domain
1. Sign up at <https://resend.com> (free tier: 100 emails/day). Any email works for the
   account — the "only delivers to your own address" limit goes away once the domain is verified.
2. **Domains → Add Domain → `djtr3y.com`**. Resend lists DNS records on the `send`
   subdomain plus a `resend._domainkey` key — they don't conflict with Google Workspace's
   root MX/SPF.
3. Add those records in Vercel (project domain djtr3y.com → DNS Records), then click
   **Verify** in Resend.

## 2. API key → Vercel
Resend → **API Keys → Create API Key** (Sending access, domain djtr3y.com). Then, from this folder:

```bash
vercel env add RESEND_API_KEY production
```

Paste the key at the prompt. Never commit it or paste it into chats.

## 3. Sender + recipient
Replace both values in production:
- `RESEND_FROM` → `AV Productionz <booking@djtr3y.com>`
- `BOOKING_TO_EMAIL` → Vic's main djtr3y.com address

```bash
vercel env rm RESEND_FROM production
```

```bash
vercel env add RESEND_FROM production
```

(same `rm` / `add` pair for `BOOKING_TO_EMAIL`), then redeploy:

```bash
vercel --prod
```

## 4. Test
Submit the live form at djtr3y.com → it should arrive in Vic's inbox within seconds,
from booking@djtr3y.com, with Reply going to the requester. If it fails, the visitor sees
"Email delivery failed — please call us at 361-945-2522" and the Vercel function logs show
the Resend error.

## Local dev (optional)
Add `RESEND_API_KEY=re_...` to `.env.local`. Without it, dev logs the inquiry and returns
`{ ok: true, dev: true }` so the form UX stays testable.
