# AV Productionz site (djtr3y.com)

Marketing site for AV Productionz / Victor "DJ Trey" Gutierrez, an Austin DJ.

## Who you're working with

Usually **Vic**, the business owner. He is not a developer.
- Explain in plain language, briefly. Lead with what changed and how to check it.
- When you're done, tell him to click **Create PR**, open the **Visit Preview** link Vercel comments on the pull request, and click **Merge pull request** if it looks right. Merging to `main` publishes to djtr3y.com in about a minute.

## Rules

- **Content changes only.** Never change environment variables, DNS, Vercel settings, or the Resend setup, and never ask for API keys, passwords, or codes. Those belong to Allan (the site's admin). If a request needs them, say so and stop.
- `EMAIL-SETUP.md` is Allan's runbook. Don't walk Vic through it.
- Don't edit `.github/workflows/`. It's what publishes Vic's merges to the live site.
- **This repo is public.** Don't commit client phone numbers or emails, private pricing, addresses, or testimonials without the client's permission. If Vic's request includes any of these, point it out before saving.
- **Never invent** testimonials, client names, stats, or reviews.
  - `src/data/testimonials.ts` and the headline quote in `src/components/sections/testimonials.tsx` are placeholders.
  - Keep `enableTestimonials` off until both are replaced with real, approved quotes.
  - Keep `enableMixes` off until `mixes.url` holds a real SoundCloud or Mixcloud embed URL.
- Keep the existing design: dark-luxe tokens in `src/app/globals.css` (ink, ivory, champagne), the motion helpers in `src/components/motion/`, and respect for reduced motion.
- Before finishing, run `npm ci` (first time in a session), then `npm run lint`, `npm run typecheck`, and `npm run build`. Fix anything they flag.

## Where content lives

| Content | File |
|---|---|
| Phone, displayed email, socials, nav, stats, SEO title/description, feature switches, Mixes URL | `src/lib/site-config.ts` |
| Stats repeated in the scrolling text band | `src/components/sections/marquee-band.tsx` |
| Hero headline and intro | `src/components/sections/hero.tsx` |
| Services | `src/data/services.ts` |
| Clients and venues | `src/data/clients.ts` |
| Gallery (filters use `category`) | `src/data/gallery.ts` |
| Highlight-reel cards | `src/data/highlights.ts` |
| About heading, bio, portrait (placeholder until a real photo is added) | `src/components/sections/about.tsx` |
| Booking intro and 24-hour promise | `src/components/sections/booking.tsx`, `src/components/forms/booking-form.tsx` |
| Booking form options | `src/types/booking.ts` |
| Media files | `public/media/`, `public/media/gallery/` |
| Search engine details (business info, service area) | `src/lib/site-config.ts`, `src/lib/structured-data.ts` |
| Pages listed for search engines | `src/app/sitemap.ts` |

Media notes:
- Browsers cache `public/media/` files for 30 days. To replace a file, use a new file name and update the reference, or returning visitors keep seeing the old one.
- Every gallery or highlight video needs a `poster` image. It shows until the video plays, and it stays for visitors on slow connections or with reduced motion.

The email in `site-config.ts` is display only. Where booking inquiries are delivered is set by the `BOOKING_TO_EMAIL` environment variable on Vercel, which only Allan changes.

## Stack

Next.js 16 (App Router, React 19, TypeScript strict), Tailwind CSS v4, CSS animations (`src/app/globals.css`) with a small in-view helper (`src/components/motion/`), Embla Carousel, react-hook-form + Zod 3, Resend + React Email, Vercel Analytics. Hosted on Vercel: merging to `main` deploys production, and other branches get preview deployments.
