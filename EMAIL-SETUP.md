# Booking email — final setup (≈2 minutes)

Everything is wired: the form validates, blocks bots (honeypot), and the API route renders
a styled inquiry email to **info.avproz@gmail.com** with reply-to set to the requester.
The **only** missing piece is a Resend API key.

## 1. Create the key
1. Sign up (free) at <https://resend.com> — 100 emails/day, no card needed.
2. Dashboard → **API Keys** → **Create API Key** → name `avproductionz-site`, permission *Sending access*.
3. Copy the key (starts with `re_`).

## 2. Add it to Vercel production
From this folder:

```bash
vercel env add RESEND_API_KEY production
```

(paste the key when prompted), then redeploy:

```bash
vercel --prod
```

Dashboard alternative: vercel.com → Infinite Burn Rate → vic-dj → Settings → Environment Variables.

Already set for you in production: `RESEND_FROM`, `BOOKING_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`.

## 3. Local dev (optional)
Add the same key to `.env.local`: `RESEND_API_KEY=re_...`

## 4. Test
Submit the live booking form → the inquiry should land at info.avproz@gmail.com within
seconds. Until the key exists, production shows a clear "call or DM" error instead of
silently dropping the lead (fixed — it used to fake success).

## Later — once avproductionz.com is connected
1. Resend → **Domains** → add `avproductionz.com` → create the DNS records it lists.
2. Switch the sender:

```bash
vercel env rm RESEND_FROM production
```

```bash
vercel env add RESEND_FROM production
```

   …with value `AV Productionz <booking@avproductionz.com>`, then redeploy.

Until the domain is verified, mail sends from `onboarding@resend.dev` — fine for testing,
but do the domain step before real traffic so inquiries land in the inbox, not spam.
