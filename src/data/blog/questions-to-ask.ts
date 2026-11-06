import type { Post } from "@/data/blog/types"

export const questionsToAsk: Post = {
  slug: "questions-to-ask-wedding-dj-austin",
  title: "15 Questions to Ask an Austin Wedding DJ Before You Book",
  description:
    "Use these 15 questions to compare Austin wedding DJs on experience, backup gear, MC style, venue rules, and what the contract really covers.",
  category: "Weddings",
  published: "2026-11-05",
  cover: {
    src: "/media/gallery/kalahari-booth.jpg",
    alt: "DJ Trey at the booth at Kalahari Resorts Round Rock",
    width: 1440,
    height: 1440,
    position: "50% 18%",
  },
  body: [
    {
      type: "p",
      text: "Most DJ websites look alike, so a short call tells you more than a page of photos. These 15 questions show you how a DJ works, what you are really paying for, and what happens if something goes wrong.",
    },
    { type: "h2", text: "The person" },
    {
      type: "ol",
      items: [
        "Will you be the DJ at my wedding, and can the contract say so? Some companies send whoever is free.",
        "Have you worked at my venue, or one like it? An outdoor Hill Country site and a downtown ballroom are different jobs.",
        "How many weddings have you done? Club experience helps, but weddings also need timeline and MC skills.",
      ],
    },
    { type: "h2", text: "The music" },
    {
      type: "ol",
      start: 4,
      items: [
        "How do you handle must-play and do-not-play lists? You want a process, not a shrug.",
        "How do you handle guest requests? Decide together if you want them at all.",
        "Do you mix live and read the crowd, or follow a fixed playlist? Read [how a DJ reads a room](/blog/how-a-dj-reads-a-room).",
        "Can you make custom edits, such as a shorter first dance?",
      ],
    },
    { type: "h2", text: "The day" },
    {
      type: "ol",
      start: 8,
      items: [
        "Will you also act as MC, and what is your style? Ask to hear it. Some couples want a quiet voice, and others want a hype host.",
        "What sound do you provide for the ceremony and toasts? Outdoor vows need a microphone that works in wind.",
        "What is your backup plan if equipment fails? Ask for specifics.",
        "Do you offer lighting, and what does it look like in a room like mine?",
        "How do you work with my planner, photographer, and venue on the timeline?",
      ],
    },
    { type: "h2", text: "The paperwork" },
    {
      type: "ol",
      start: 13,
      items: [
        "Do you carry liability insurance? Many venues ask for a certificate.",
        "What is included, and what costs extra? Check hours, overtime, and travel. Our guide to [wedding DJ costs in Austin](/blog/wedding-dj-cost-austin) covers this.",
        "What are the deposit, cancellation, and backup DJ terms if you are sick on the day?",
      ],
    },
    { type: "h2", text: "One more thing to check" },
    {
      type: "p",
      text: "Ask your venue for its music cutoff time and sound limit, then share them with your DJ. For outdoor events, read [Austin's outdoor sound rules](/blog/austin-outdoor-event-sound-rules).",
    },
    { type: "p", text: "Ready to ask us these questions? [Send us your date and venue](/#booking)." },
  ],
}
