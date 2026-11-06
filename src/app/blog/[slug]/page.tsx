import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PostBody } from "@/components/blog/post-body"
import { PostCard } from "@/components/blog/post-card"
import { Button } from "@/components/ui/button"
import { getPost, posts } from "@/data/blog"
import { siteConfig } from "@/lib/site-config"
import { formatPostDate } from "@/lib/utils"

type PostPageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    // Absolute: the site-name suffix would push these past what Google shows.
    title: { absolute: post.title },
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.published,
      images: [{ url: post.cover.src, alt: post.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.cover.src],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const url = `${siteConfig.url}/blog/${post.slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    image: `${siteConfig.url}${post.cover.src}`,
    url,
    mainEntityOfPage: url,
    author: { "@id": `${siteConfig.url}/#business` },
    publisher: { "@id": `${siteConfig.url}/#business` },
  }
  const related = posts.filter((other) => other.slug !== post.slug).slice(0, 3)

  return (
    <>
      <Header />
      <main className="pb-24 pt-32">
        {/* Static data from this repo only. "<" is escaped as the Next.js JSON-LD guide requires. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <article className="mx-auto w-full max-w-[768px] px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/60 transition-colors hover:text-champagne"
          >
            <ArrowLeft size={13} /> All posts
          </Link>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-champagne">
            {post.category} · <time dateTime={post.published}>{formatPostDate(post.published)}</time>
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.25rem,5.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-ivory">
            {post.title}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-ivory/70">{post.description}</p>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-sm ring-1 ring-ivory/10">
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              fill
              sizes="(min-width: 768px) 720px, 100vw"
              quality={60}
              loading="eager"
              fetchPriority="high"
              style={post.cover.position ? { objectPosition: post.cover.position } : undefined}
              className="object-cover"
            />
          </div>

          <div className="mt-10">
            <PostBody blocks={post.body} />
          </div>

          {post.sources?.length ? (
            <aside className="mt-12 border-t border-ivory/10 pt-6">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/55">Sources</h2>
              <ul className="mt-3 space-y-2 text-sm text-ivory/60">
                {post.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-champagne">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          <div className="mt-14 rounded-sm border border-ivory/10 bg-ink-soft p-8">
            <h2 className="font-display text-2xl text-ivory">Planning an event in Austin?</h2>
            <p className="mt-3 leading-relaxed text-ivory/70">
              Share your date and venue, and we&rsquo;ll reply within 24 hours with availability and a quote.
            </p>
            <Button asChild variant="primary" size="md" className="mt-6">
              <Link href="/#booking">Book DJ Trey</Link>
            </Button>
          </div>
        </article>

        <section className="mx-auto mt-24 w-full max-w-[1320px] border-t border-ivory/10 px-6 pt-14 md:px-10 lg:px-14">
          <h2 className="mb-10 font-mono text-[11px] uppercase tracking-[0.24em] text-champagne">Keep reading</h2>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((other) => (
              <PostCard key={other.slug} post={other} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
