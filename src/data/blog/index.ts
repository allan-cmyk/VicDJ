import type { Post } from "@/data/blog/types"
import { corporateHolidayParty } from "@/data/blog/corporate-holiday-party"
import { lakeTravisPartyBoat } from "@/data/blog/lake-travis-party-boat"
import { outdoorSoundRules } from "@/data/blog/outdoor-sound-rules"
import { weddingDjCost } from "@/data/blog/wedding-dj-cost"
import { rooftopParty } from "@/data/blog/rooftop-party"
import { questionsToAsk } from "@/data/blog/questions-to-ask"
import { djOrBand } from "@/data/blog/dj-or-band"
import { readingARoom } from "@/data/blog/reading-a-room"
import { highlightReel } from "@/data/blog/highlight-reel"

/** Newest first on the blog page. To add a post, add a file here and list it below. */
export const posts: readonly Post[] = [
  corporateHolidayParty,
  lakeTravisPartyBoat,
  outdoorSoundRules,
  weddingDjCost,
  rooftopParty,
  questionsToAsk,
  djOrBand,
  readingARoom,
  highlightReel,
]

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}
