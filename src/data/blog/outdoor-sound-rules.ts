import type { Post } from "@/data/blog/types"

export const outdoorSoundRules: Post = {
  slug: "austin-outdoor-event-sound-rules",
  title: "Austin Outdoor Music Rules: Sound Limits and Cutoff Times",
  description:
    "Planning outdoor music in Austin? Here are the city's sound limits and latest allowed hours for venues, and what they mean for your event timeline.",
  category: "Planning",
  published: "2026-11-05",
  cover: {
    src: "/media/gallery/highland-patio.jpg",
    alt: "Night patio at Highland Lounge in Austin with string lights and a neon mural",
    width: 1440,
    height: 1435,
  },
  body: [
    {
      type: "p",
      text: "If your reception, company party, or birthday is on a patio, lawn, or rooftop in Austin, the city's sound rules can decide when the music stops. This guide covers what the City of Austin publishes for commercial venues, and what to ask before you sign a contract.",
    },
    {
      type: "p",
      text: "This is a plain-language summary, not legal advice. Rules change, and each venue's permit is different. We last checked the city's pages on November 5, 2026, so confirm the details with your venue.",
    },
    { type: "h2", text: "What counts as outdoor" },
    {
      type: "p",
      text: "The city says commercial establishments that use sound equipment outdoors must have an Outdoor Music Venue permit. It defines outdoor as \"any space not fully enclosed by four solid walls and a roof.\" By that wording, a patio with a roof but an open side still counts as outdoor.",
    },
    { type: "h2", text: "The sound limit" },
    {
      type: "p",
      text: "The city says the loudest level allowed by code is 85 dBA, with a 70 dBA maximum for restaurant uses. Each permit sets its own levels, so your venue's limit may be lower.",
    },
    { type: "h2", text: "The latest allowed times" },
    {
      type: "p",
      text: "Each permit sets its own hours. The city lists these as the latest allowed times for outdoor amplified sound, starting from 10 a.m.:",
    },
    {
      type: "ul",
      items: [
        "Citywide: 10:30 p.m. Monday to Wednesday, 11 p.m. Thursday, and midnight Friday and Saturday.",
        "Red River District: 10:30 p.m. Monday to Wednesday, midnight Thursday, and 1 a.m. Friday and Saturday.",
        "6th Street and Warehouse Districts, for a capacity of 600 or less: 2 a.m. Monday to Saturday.",
      ],
    },
    { type: "p", text: "The city's list does not show Sunday in these groups, so ask your venue about Sunday hours." },
    { type: "h2", text: "Tighter limits near homes" },
    {
      type: "p",
      text: "For permits within 600 feet of residential property, the city sets maximum hours of 10 a.m. to 8 p.m. Sunday through Thursday, and 10 a.m. to 10 p.m. on Friday and Saturday. Those hours can be extended by up to two hours a day with support from nearby owners, tenants, and neighborhood organizations.",
    },
    {
      type: "p",
      text: "The city also says permits may not be issued for using sound equipment within 100 feet of property zoned and used as residential.",
    },
    { type: "h2", text: "Venues outside Austin city limits" },
    {
      type: "p",
      text: "These are City of Austin rules. If your venue is in another city or an unincorporated part of the county, different rules can apply. Ask the venue what it follows.",
    },
    { type: "h2", text: "What this means for your timeline" },
    {
      type: "ul",
      items: [
        "Get the venue's music cutoff time in writing before you book.",
        "Build your timeline backward from that time, so the last dance is not cut off.",
        "If the venue has an indoor room, ask if the party can move inside when the outdoor music ends.",
        "Ask who monitors the sound level on the night.",
        "Tell your DJ the limit in advance, so the speakers can be placed for it.",
      ],
    },
    {
      type: "p",
      text: "Venues take this seriously. Complaints go through 3-1-1, the city's Sound Enforcement Team takes decibel readings, and repeat violations can lead the city to suspend or revoke a permit. If your venue asks you to turn the music down, this is why.",
    },
    {
      type: "p",
      text: "Planning something high up? Read [our guide to rooftop parties in Austin](/blog/austin-rooftop-party-dj). If you want help planning around your venue's limits, [send us your date and venue](/#booking).",
    },
  ],
  sources: [
    { label: "City of Austin: Outdoor Music Venue Permits", url: "https://www.austintexas.gov/page/outdoor-music-venue-permits" },
    {
      label: "City of Austin: Noise and Amplified Sound Enforcement",
      url: "https://www.austintexas.gov/development-services/noise-and-amplified-sound-enforcement",
    },
  ],
}
