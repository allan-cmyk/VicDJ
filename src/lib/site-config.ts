export const siteConfig = {
  name: "AV Productionz",
  title: "DJ Trey | Austin DJ for Weddings, Corporate & Nightlife",
  description:
    "Austin's open-format DJ, 23 years in the making. Since 2008, AV Productionz has produced sound and staging for luxury weddings, corporate galas, and the city's top nightlife rooms.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://djtr3y.com",
  tagline: "Austin's open-format DJ, 23 years in the making — for the nights people don't forget.",
  since: 2003,
  founded: 2008,
  locale: "en-US",
  location: {
    city: "Austin",
    region: "TX",
    country: "US",
  },
  // Used in search-engine structured data only. Keep to places Vic really works.
  areaServed: ["Austin, TX", "Round Rock, TX", "San Marcos, TX", "Lake Travis, TX"],
  founder: {
    name: "Victor Gutierrez",
    stageName: "DJ Trey",
  },
  contact: {
    phone: "361-945-2522",
    phoneHref: "tel:+13619452522",
    phoneE164: "+13619452522",
    email: "vic@djtr3y.com",
    emailHref: "mailto:vic@djtr3y.com",
  },
  socials: {
    instagram: {
      handle: "@djtr3y",
      url: "https://www.instagram.com/djtr3y/",
    },
    facebook: {
      handle: "AVProz",
      url: "https://www.facebook.com/AVProz/",
    },
    tiktok: {
      handle: "@thedjtr3y",
      url: "https://www.tiktok.com/@thedjtr3y",
    },
    youtube: {
      handle: "@TheDJTr3y",
      url: "https://www.youtube.com/@TheDJTr3y",
    },
  },
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Clients", href: "/#clients" },
    { label: "Gallery", href: "/#gallery" },
    { label: "About", href: "/#about" },
    { label: "Blog", href: "/blog" },
    { label: "Book", href: "/#booking" },
  ],
  stats: [
    { value: "2003", label: "Since" },
    { value: "250+", label: "Events" },
    { value: "100+", label: "Weddings" },
    { value: "24 hr", label: "Reply time" },
  ],
  // Slim offer strip above the header. Set `enabled: false` to remove it early.
  // It also hides itself automatically after `endsAfter` (Central time).
  // Starting wedding price (the Basic package in the 2026 brochure: live DJ/MC, sound, wireless mic, 5 hours).
  // Shown under the Weddings service and beside the booking form.
  weddingPriceNote: "Wedding packages from $1,750: live DJ, MC and sound.",
  promoBanner: {
    enabled: true,
    endsAfter: "2027-01-15T23:59:59-06:00",
    message: "Now booking 2027 weddings: book by Jan 15 and your uplighting is free ($300 value)",
    shortMessage: "2027 weddings: free uplighting by Jan 15",
    note: "Limited holiday dates",
    cta: { label: "Check your date", href: "/#booking" },
  },
  features: {
    // Flip these as assets / copy arrive.
    enableTestimonials: false,
    enableMixes: false,
  },
  mixes: {
    // Set to a SoundCloud or Mixcloud embed URL once confirmed.
    // Example: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/123"
    url: "",
  },
} as const

export type SiteConfig = typeof siteConfig
