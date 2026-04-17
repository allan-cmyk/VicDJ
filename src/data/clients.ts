/**
 * Previous clients — ordered as supplied by Victor.
 * Rendered in the auto-scrolling marquee on the homepage.
 */

export type Client = {
  name: string
  /** Loose category — used only for subtle accent variation. */
  category: "hospitality" | "corporate" | "nightlife" | "education" | "event"
}

export const clients: readonly Client[] = [
  { name: "The Bowie on 4th", category: "hospitality" },
  { name: "Archer Hotel at the Domain", category: "hospitality" },
  { name: "Skyhouse", category: "hospitality" },
  { name: "Kalahari Resorts Round Rock", category: "hospitality" },
  { name: "Flatiron at the Domain", category: "hospitality" },
  { name: "Whataburger", category: "corporate" },
  { name: "Free to Breathe", category: "event" },
  { name: "Endeavor Real Estate", category: "corporate" },
  { name: "Frost Bank Tower", category: "corporate" },
  { name: "Gateway College Preparatory School", category: "education" },
  { name: "iTalk Global", category: "corporate" },
  { name: "University Estates", category: "hospitality" },
  { name: "The Connection", category: "hospitality" },
  { name: "Maximum FX Salons", category: "corporate" },
  { name: "Clayton Elementary School", category: "education" },
  { name: "Bailey Middle School", category: "education" },
  { name: "Jingle Ball 5K", category: "event" },
  { name: "Cru Wine Bar", category: "nightlife" },
  { name: "Rose Room", category: "nightlife" },
  { name: "77 Degrees Rooftop", category: "nightlife" },
  { name: "Jack and Gingers", category: "nightlife" },
  { name: "Lavaca St Bar", category: "nightlife" },
  { name: "Oskar Blues Brewery", category: "nightlife" },
  { name: "Celis Brewery", category: "nightlife" },
  { name: "Brasstap", category: "nightlife" },
  { name: "The Veranda in San Marcos", category: "hospitality" },
  { name: "The Driskill", category: "hospitality" },
  { name: "512 Bar", category: "nightlife" },
  { name: "Old School Bar and Grill", category: "nightlife" },
  { name: "Trophy Room", category: "nightlife" },
  { name: "Burnsides Tavern", category: "nightlife" },
  { name: "Speakeasy on Congress", category: "nightlife" },
  { name: "Ra Sushi Bar", category: "hospitality" },
  { name: "Highland Lounge", category: "nightlife" },
  { name: "Palm Door on Sabine", category: "nightlife" },
  { name: "The Austonian", category: "hospitality" },
] as const
