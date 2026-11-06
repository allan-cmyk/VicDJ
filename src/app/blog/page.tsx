import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PostCard } from "@/components/blog/post-card"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { posts } from "@/data/blog"

const description =
  "Practical guides for planning music at Austin weddings, corporate events, rooftop parties, and Lake Travis boat parties, from AV Productionz and DJ Trey."

export const metadata: Metadata = {
  title: "Austin DJ Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title: "Austin DJ Blog", description, url: "/blog" },
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1320px] px-6 pb-28 pt-36 md:px-10 lg:px-14">
        <EyebrowLabel className="mb-5">Blog</EyebrowLabel>
        <h1 className="max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] tracking-[-0.02em] text-ivory">
          Austin event music, <em className="font-light italic text-champagne">planned properly.</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/70">
          Guides for weddings, corporate events, rooftops, and Lake Travis boat parties.
        </p>
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              sizes="(min-width: 1320px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
