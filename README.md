# AV Productionz — Marketing Site

Cinematic marketing site for **AV Productionz / DJ Trey** (Victor Gutierrez), Austin TX. Weddings · Corporate · Nightlife & Cruise.

## Stack

- Next.js 16 (App Router, TypeScript strict)
- Tailwind CSS v4 (CSS-variable theme in `globals.css`)
- Framer Motion 12
- react-hook-form + Zod
- Resend + @react-email (booking inquiries)
- Vercel Analytics

## Dev

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY
npm run dev
```

## Assets

Drop client-supplied media here:

- `public/media/hero-sunset.mp4` — main hero video (H.264, muted, ≤6 MB, 1080p)
- `public/media/hero-poster.jpg` — hero poster still
- `public/media/gallery/` — event photos (4:5 preferred)
- `public/media/portrait.jpg` — About-section portrait

Everything falls back to placeholders/empty states until assets land, so the site never breaks mid-swap.

## Feature flags

Edit `src/lib/site-config.ts`:

- `enableTestimonials` — flip on once real quotes arrive
- `mixes.url` — paste correct SoundCloud/Mixcloud URL to reveal Mixes section

## Deploy

Push to GitHub → Import in Vercel → set `RESEND_API_KEY`, `RESEND_FROM`, `BOOKING_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`.
