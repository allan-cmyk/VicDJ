import type { Post } from "@/data/blog/types"

export const readingARoom: Post = {
  slug: "how-a-dj-reads-a-room",
  title: "How a DJ Reads a Room, and Why Club Nights Help at Weddings",
  description:
    "What does reading the room really mean? Here is how an open-format DJ watches a crowd, and why nightlife experience carries over to weddings.",
  category: "Nightlife",
  published: "2026-11-05",
  cover: {
    src: "/media/gallery/tile-friday-poster.jpg",
    alt: "View from the DJ booth over a crowded dance floor, with a laptop in the foreground",
    width: 640,
    height: 640,
    position: "50% 40%",
  },
  body: [
    {
      type: "p",
      text: "Every DJ says they read the room. Few explain what that means. In practice, it is a series of small decisions, made every few minutes, based on what the crowd is doing.",
    },
    { type: "h2", text: "What open format means" },
    {
      type: "p",
      text: "An open-format DJ plays across genres and eras instead of sticking to one style. DJ Trey's Instagram bio calls him an open-format MC and DJ. That range is what makes reading a room possible, because the DJ always has somewhere else to go.",
    },
    { type: "h2", text: "What a DJ watches" },
    {
      type: "ul",
      items: [
        "Who is dancing, as well as how many. A floor of one age group can tell you who has not been reached yet.",
        "Feet and hands. Are people moving, or just standing there?",
        "Who just left. If a whole group walks off at once, that song missed.",
        "The edges of the room. People singing along from the bar are often one song away from the floor.",
        "Phones. Filming a song is a good sign. Scrolling is not.",
      ],
    },
    { type: "h2", text: "What a DJ changes" },
    {
      type: "ul",
      items: [
        "Genre: moving to a style that part of the room has been waiting for.",
        "Era: dropping a song from the decade the older guests danced to.",
        "Tempo: raising or lowering the pace so the floor does not burn out.",
        "Timing: leaving a song early if it is not working, or letting one run if it is.",
        "The build: holding back the biggest songs until the room is ready for them.",
      ],
    },
    { type: "h2", text: "Why club nights help at weddings" },
    {
      type: "p",
      text: "A club crowd has no reason to be polite. If a song misses, people leave, and the DJ sees it right away. Years of those rooms build fast instincts. The AV Productionz client list includes nightlife rooms such as Highland Lounge, Rose Room, and Speakeasy on Congress.",
    },
    {
      type: "p",
      text: "Weddings ask for that same instinct, plus skills a club does not. There is a timeline, there are formal moments, and three generations are in one room. A wedding DJ needs both sides: the discipline to hit the schedule, and the instinct to pack the floor once it is over.",
    },
    { type: "h2", text: "How to help your DJ read your room" },
    {
      type: "ul",
      items: [
        "Tell them who is coming, including the age mix and any big friend groups.",
        "Share your must-plays, but do not script every song. Leave room to respond to the crowd.",
        "Keep the do-not-play list short and clear.",
        "Ask the venue to keep the dance floor close to the tables, so guests can see the fun.",
      ],
    },
    {
      type: "p",
      text: "Want a DJ who watches the floor? [Tell us about your event](/#booking). For a checklist to use with any DJ, read [15 questions to ask before you book](/blog/questions-to-ask-wedding-dj-austin).",
    },
  ],
}
