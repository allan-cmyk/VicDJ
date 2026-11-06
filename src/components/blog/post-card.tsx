import Image from "next/image"
import Link from "next/link"
import type { Post } from "@/data/blog/types"
import { formatPostDate } from "@/lib/utils"

export function PostCard({ post, sizes }: { post: Post; sizes: string }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne rounded-sm">
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm ring-1 ring-ivory/10">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            sizes={sizes}
            quality={60}
            style={post.cover.position ? { objectPosition: post.cover.position } : undefined}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        </div>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-champagne">
          {post.category} · {formatPostDate(post.published)}
        </p>
        <h2 className="mt-3 font-display text-2xl leading-tight text-ivory transition-colors group-hover:text-champagne">
          {post.title}
        </h2>
        <p className="mt-3 leading-relaxed text-ivory/65">{post.description}</p>
      </Link>
    </article>
  )
}
