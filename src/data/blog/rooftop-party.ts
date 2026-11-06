import type { Post } from "@/data/blog/types"

export const rooftopParty: Post = {
  slug: "austin-rooftop-party-dj",
  title: "Planning a Rooftop Party in Austin: Sound, Power, and Timing",
  description:
    "Austin rooftops look great and can be tricky for music. Here is what to plan for sound, power, load-in, weather, and timing at a rooftop event.",
  category: "Nightlife",
  published: "2026-11-05",
  cover: {
    src: "/media/hero-sunset-poster.jpg",
    alt: "DJ Trey playing a rooftop set at sunset",
    width: 1080,
    height: 1920,
    position: "50% 42%",
  },
  body: [
    {
      type: "p",
      text: "A rooftop gives you the skyline and the sunset. It also gives you wind, open air, and often a small elevator. A little planning keeps the view without the problems.",
    },
    {
      type: "p",
      text: "Rooftops are a regular setting for DJ Trey. His Instagram bio lists a residency at Urban Rooftop, and the AV Productionz client list includes 77 Degrees Rooftop.",
    },
    { type: "h2", text: "Start with the sound rules" },
    {
      type: "p",
      text: "To the City of Austin, a rooftop is outdoors, so a commercial venue's outdoor sound permit sets its limits and hours. Ask your venue for the music cutoff time before you plan anything else. Our guide to [Austin's outdoor sound rules](/blog/austin-outdoor-event-sound-rules) explains how those limits work.",
    },
    { type: "h2", text: "Plan for open air" },
    {
      type: "ul",
      items: [
        "With no walls to hold the sound, speaker placement matters more than raw volume.",
        "Wind can make a microphone hard to hear, so test speeches at the spot where people will stand.",
        "Ask where the neighbors are, and point the speakers away from them if you can.",
      ],
    },
    { type: "h2", text: "Ask about load-in early" },
    {
      type: "ul",
      items: [
        "How big is the service elevator, and when can vendors use it?",
        "Is there a loading zone, and where do vendors park?",
        "Does building security need vendor names in advance?",
        "How much time is there between load-in and the first guest?",
      ],
    },
    { type: "h2", text: "Check the power" },
    {
      type: "p",
      text: "Ask which outlets the DJ can use, and whether they share a circuit with the bar, heaters, or catering equipment. Lighting adds to the load. It is better to answer this before the event than when the music cuts out.",
    },
    { type: "h2", text: "Have a weather plan" },
    {
      type: "ul",
      items: [
        "Decide who makes the weather call, and by what time.",
        "Ask if there is an indoor backup space.",
        "Make sure equipment has cover from sun and rain.",
        "In summer, plan for the heat on your guests as well as on the gear.",
      ],
    },
    { type: "h2", text: "Time the night around the sunset" },
    {
      type: "p",
      text: "Look up the sunset time for your date, because it moves a lot through the year. Have guests arrive before it. Keep the music relaxed during golden hour so people can talk and take photos, then build the energy as it gets dark. Once the sun is down, lighting does much of the work, so plan it for the dark hours.",
    },
    {
      type: "p",
      text: "Booking a rooftop for a private party or company event? [Tell us about your venue](/#booking). If it is a work event, read [how to plan the music for a corporate holiday party](/blog/corporate-holiday-party-dj-austin).",
    },
  ],
}
