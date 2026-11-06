import type { Post } from "@/data/blog/types"

export const djOrBand: Post = {
  slug: "dj-or-band-austin-wedding",
  title: "DJ or Live Band for Your Austin Wedding?",
  description:
    "Austin is known for live music, so should your wedding have a band? Here is an honest comparison of cost, space, song choice, and energy.",
  category: "Weddings",
  published: "2026-11-05",
  cover: {
    src: "/media/gallery/sushi-bar-night.jpg",
    alt: "Night DJ set at a sushi bar with warm wine-bar lighting",
    width: 2048,
    height: 1536,
    position: "50% 35%",
  },
  body: [
    {
      type: "p",
      text: "Austin calls itself the Live Music Capital of the World, so it is a fair question. We are a DJ company, so keep that in mind as you read. For some couples, a band is the right answer.",
    },
    { type: "h2", text: "Cost" },
    {
      type: "p",
      text: "Zola puts a wedding band at about $3,000 to $10,000 and a wedding DJ at around $500 to $2,000. Your real numbers will depend on hours and on what is included. For local figures, see [what a wedding DJ costs in Austin](/blog/wedding-dj-cost-austin).",
    },
    { type: "h2", text: "Song choice" },
    {
      type: "p",
      text: "A DJ can play the original version of almost any song, across any genre and decade, and can change direction in seconds. A band plays what it has rehearsed, though a great band can make those songs feel like your own.",
    },
    { type: "h2", text: "Energy and feel" },
    {
      type: "p",
      text: "Nothing looks quite like a live band on stage, and for many guests that is the point. A band brings a sense of occasion that a DJ booth does not. A good DJ brings something else: no breaks, and the ability to read the crowd and switch styles right away. Bands usually need longer breaks, which can leave a gap in the energy.",
    },
    { type: "h2", text: "Space and sound limits" },
    {
      type: "p",
      text: "A band needs a lot more room and more equipment than a DJ. Volume matters too. A drum kit has a natural loudness, while a DJ can turn down at once. That helps at a venue with a strict limit, and many outdoor sites have one. Read [Austin's outdoor sound rules](/blog/austin-outdoor-event-sound-rules) before you decide.",
    },
    { type: "h2", text: "You can have both" },
    {
      type: "p",
      text: "You do not have to choose only one. Some couples book live musicians for the ceremony or cocktail hour, then a DJ for the reception. You get the live moment, and you keep the range and cost control for the dance floor.",
    },
    { type: "h2", text: "How to decide" },
    {
      type: "ul",
      items: [
        "If live performance is what you picture when you imagine your wedding, and the budget allows it, book a band.",
        "If you want the widest song choice and a full dance floor all night, book a DJ.",
        "If your venue is small or has a tight sound limit, a DJ is usually the easier fit.",
        "If you want both, split the day.",
      ],
    },
    {
      type: "p",
      text: "Whichever you choose, [these 15 questions](/blog/questions-to-ask-wedding-dj-austin) will help you compare your options. If a DJ is the right fit, [tell us about your day](/#booking).",
    },
  ],
  sources: [
    { label: "Zola: How to choose a wedding band or DJ", url: "https://www.zola.com/expert-advice/choose-wedding-band-or-dj" },
  ],
}
