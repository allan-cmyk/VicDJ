import type { Post } from "@/data/blog/types"

export const weddingDjCost: Post = {
  slug: "wedding-dj-cost-austin",
  title: "How Much Does a Wedding DJ Cost in Austin?",
  description:
    "WeddingWire puts the Austin average near $900, but quotes can run far higher. Here is what drives the price of a wedding DJ and how to compare quotes.",
  category: "Weddings",
  published: "2026-11-05",
  cover: {
    src: "/media/gallery/pioneer-deck.jpg",
    alt: "Numark DJ controller with a colorful captain's hat resting on top",
    width: 1080,
    height: 1080,
    position: "50% 60%",
  },
  body: [
    {
      type: "p",
      text: "WeddingWire lists the average cost of a wedding DJ in Austin at about $900, with most couples spending between $700 and $1,175. Its full range runs from $500 or less to $1,908 or more. Zola gives a similar range of around $500 to $2,000.",
    },
    {
      type: "p",
      text: "Those numbers are a useful starting point, but an average mixes very different services. A short reception set and a full day of ceremony sound, MC work, and lighting are different jobs. Two quotes only compare fairly if they cover the same things.",
    },
    { type: "h2", text: "What changes the price" },
    {
      type: "ul",
      items: [
        "Hours: a full day costs more than a three-hour reception.",
        "Ceremony sound: a ceremony in a different spot from the reception often needs a second setup and microphones.",
        "MC work: someone has to run the timeline and make the announcements.",
        "Lighting: uplighting and dance floor lighting are usually add-ons.",
        "Travel and load-in: a distant venue or a difficult load-in takes more time.",
        "Experience and equipment: this includes backup gear, in case something fails.",
        "Date: peak Saturdays are in high demand, and some DJs price them higher.",
      ],
    },
    { type: "h2", text: "What to compare in each quote" },
    {
      type: "ul",
      items: [
        "Who exactly will perform at your wedding?",
        "How many hours are included, and what is the overtime rate?",
        "Does it cover ceremony, cocktail hour, and reception, or only the reception?",
        "How many microphones are included?",
        "Is lighting included, or is it extra?",
        "Are there travel or setup fees?",
        "What are the deposit and cancellation terms?",
      ],
    },
    { type: "h2", text: "How to read a low quote" },
    {
      type: "p",
      text: "A low price is not automatically a bad sign. A simple reception in a small room may not need much. Look closer when a quote leaves out the items above, because the gap may show up later as an add-on or as something missing on the day.",
    },
    { type: "h2", text: "Where to spend, and where to save" },
    {
      type: "p",
      text: "If your budget is tight, protect the person and the sound first, because those are what your guests experience. Lighting can scale up or down with the room. Fewer hours can also save money, as long as the DJ still covers the moments that matter to you.",
    },
    { type: "h2", text: "Getting a quote from us" },
    {
      type: "p",
      text: "AV Productionz wedding services include ceremony and cocktail music, reception and MC work, uplighting and lighting design, custom first-dance edits, and sound for toasts and speeches. [Send us your date, venue, and guest count](/#booking), and we will reply within 24 hours with availability, packages, and a quote.",
    },
    {
      type: "p",
      text: "Comparing DJs? Use our [15 questions to ask before you book](/blog/questions-to-ask-wedding-dj-austin). Still deciding on the format? Read [DJ or live band for your Austin wedding](/blog/dj-or-band-austin-wedding).",
    },
  ],
  sources: [
    { label: "WeddingWire: Wedding DJ cost, Austin, TX", url: "https://www.weddingwire.com/cost/wedding-dj?region_code=635" },
    { label: "Zola: How to choose a wedding band or DJ", url: "https://www.zola.com/expert-advice/choose-wedding-band-or-dj" },
  ],
}
