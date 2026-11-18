import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Reveal } from "@/components/motion/reveal"
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/ui/social-icons"
import { siteConfig } from "@/lib/site-config"

/**
 * Compact CTA band pointing at the Instagram feed — where the freshest
 * content lives between site updates — with TikTok and YouTube alongside.
 */
const SECONDARY_SOCIALS = [
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
  { key: "youtube", label: "YouTube", Icon: YouTubeIcon },
] as const

export function InstagramBand() {
  return (
    <Section tone="ink-soft" className="py-20 lg:py-28">
      <Reveal className="flex flex-col items-center text-center">
        <p className="mb-5 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/55">
          <span aria-hidden className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-champagne" />
          New sets every weekend
        </p>
        <Link
          href={siteConfig.socials.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 md:gap-6"
        >
          <InstagramIcon
            size={30}
            className="text-ivory/60 transition-colors duration-300 group-hover:text-champagne"
          />
          <span className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-none tracking-[-0.02em] text-ivory transition-colors duration-300 group-hover:text-champagne">
            {siteConfig.socials.instagram.handle}
          </span>
          <ArrowUpRight
            size={30}
            strokeWidth={1.3}
            className="text-ivory/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-champagne"
          />
        </Link>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {SECONDARY_SOCIALS.map(({ key, label, Icon }) => {
            const social = siteConfig.socials[key]
            return (
              <Link
                key={key}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} ${social.handle}`}
                className="inline-flex h-11 items-center gap-2.5 rounded-full border border-ivory/15 px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/75 transition-colors hover:border-champagne hover:text-champagne"
              >
                <Icon size={15} />
                <span>{label}</span>
                <span className="normal-case tracking-normal text-ivory/45">{social.handle}</span>
              </Link>
            )
          })}
        </div>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/55">
          Reels, live sets &amp; stories from the booth — follow along on Instagram, TikTok and YouTube.
        </p>
      </Reveal>
    </Section>
  )
}
