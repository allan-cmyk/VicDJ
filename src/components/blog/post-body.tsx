import Image from "next/image"
import type { PostBlock } from "@/data/blog/types"
import { InlineText } from "@/components/blog/inline-text"

export function PostBody({ blocks }: { blocks: readonly PostBlock[] }) {
  return (
    <div className="space-y-6 text-lg leading-relaxed text-ivory/80">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="pt-6 font-display text-[clamp(1.6rem,3vw,2.1rem)] leading-tight tracking-[-0.01em] text-ivory">
                {block.text}
              </h2>
            )
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-3 pl-6 marker:text-champagne">
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    <InlineText text={item} />
                  </li>
                ))}
              </ul>
            )
          case "ol":
            return (
              <ol key={i} start={block.start} className="list-decimal space-y-3 pl-7 marker:text-champagne">
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    <InlineText text={item} />
                  </li>
                ))}
              </ol>
            )
          case "image":
            return (
              <figure key={i} className="py-2">
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={block.width}
                  height={block.height}
                  sizes="(min-width: 768px) 720px, 100vw"
                  quality={60}
                  className="h-auto w-full rounded-sm ring-1 ring-ivory/10"
                />
                {block.caption ? (
                  <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/55">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            )
          default:
            return (
              <p key={i}>
                <InlineText text={block.text} />
              </p>
            )
        }
      })}
    </div>
  )
}
