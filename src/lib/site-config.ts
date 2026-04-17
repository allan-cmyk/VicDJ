export const siteConfig = {
  name: "AV Productionz",
  title: "AV Productionz — DJ Trey | Austin DJ for Weddings, Corporate & Nightlife",
  description:
    "Austin's most requested DJ. Since 2008, AV Productionz has produced sound and staging for luxury weddings, corporate galas, and the city's top nightlife rooms.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://avproductionz.com",
  tagline: "Austin's most requested DJ — for the nights people don't forget.",
  since: 2008,
  locale: "en-US",
  location: {
    city: "Austin",
    region: "TX",
  },
  contact: {
    phone: "361-945-2522",
    phoneHref: "tel:+13619452522",
    email: "info.avproz@gmail.com",
    emailHref: "mailto:info.avproz@gmail.com",
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
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Clients", href: "#clients" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Book", href: "#booking" },
  ],
  stats: [
    { value: "2008", label: "Since" },
    { value: "250+", label: "Events" },
    { value: "100+", label: "Weddings" },
    { value: "38", label: "Signature venues" },
  ],
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
