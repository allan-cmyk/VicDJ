import { Diamond, Building2, Disc3 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type Service = {
  id: "weddings" | "corporate" | "nightlife"
  number: string
  eyebrow: string
  title: string
  blurb: string
  offerings: string[]
  icon: LucideIcon
  image: string
  imageAlt: string
  /** Tailwind/CSS color used for accent rules + glow per pillar. */
  accentVar: string
}

export const services: readonly Service[] = [
  {
    id: "weddings",
    number: "01",
    eyebrow: "Weddings",
    title: "Your night, scored.",
    blurb:
      "From first look to last dance — ceremony, cocktail, reception, and all the small moments. Custom readings, live mixing, and lighting designed for the room you've chosen.",
    offerings: [
      "Ceremony & cocktail",
      "Reception & MC",
      "Uplighting & lighting design",
      "Custom first-dance edits",
      "Sound for toasts & speeches",
    ],
    icon: Diamond,
    image: "/media/gallery/flores-wedding-san-luis.jpg",
    imageAlt: "Luxury ballroom wedding with blue ceiling lighting — Flores Wedding, San Luis Resort",
    accentVar: "var(--champagne)",
  },
  {
    id: "corporate",
    number: "02",
    eyebrow: "Corporate & Private",
    title: "Rooms that move.",
    blurb:
      "Galas, brand activations, launches, and conferences. Read the room, control the tempo, keep the energy honest. Trusted by Whataburger, Frost Bank, Endeavor Real Estate, and 30+ more.",
    offerings: [
      "Brand activations & launches",
      "Galas & holiday parties",
      "Conferences & general sessions",
      "Custom emcee",
      "Integrated AV production",
    ],
    icon: Building2,
    image: "/media/gallery/private-party-lighting.jpg",
    imageAlt: "Full truss lighting rig and DJ stage at a private corporate party in Austin",
    accentVar: "#7AB8C4", // cool teal — corporate confident
  },
  {
    id: "nightlife",
    number: "03",
    eyebrow: "Nightlife & Cruise",
    title: "Open format, end to end.",
    blurb:
      "Rooftop residencies, venue takeovers, yacht and cruise bookings. Resident DJ at Premier Party Cruises and a decade of sets across Austin's best rooms.",
    offerings: [
      "Rooftop & club residencies",
      "Venue takeovers",
      "Yacht & cruise events",
      "Open-format sets",
      "Touring support",
    ],
    icon: Disc3,
    image: "/media/gallery/cruise-discoball.jpg",
    imageAlt: "Crowd dancing under disco ball on Premier Party Cruises barge, Lake Travis",
    accentVar: "#E26D9C", // hot pink — nightlife heat
  },
] as const
