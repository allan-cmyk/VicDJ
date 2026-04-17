/**
 * Placeholder testimonials — section is hidden behind siteConfig.features.enableTestimonials
 * until Victor supplies real quotes. Copy is representative, not attributed.
 */

export type Testimonial = {
  quote: string
  name: string
  role: string
  venue: string
}

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "Read the room better than any DJ we've hired. Kept the floor packed from the first dance to last call.",
    name: "—",
    role: "Wedding, private client",
    venue: "The Driskill, Austin",
  },
  {
    quote:
      "Professional from load-in to strike. Our brand team keeps asking when we're booking Trey again.",
    name: "—",
    role: "Marketing Director",
    venue: "Corporate activation",
  },
  {
    quote:
      "The only resident we trust on cruise nights. Open-format energy that never drags.",
    name: "—",
    role: "Event Producer",
    venue: "Premier Party Cruises",
  },
] as const
