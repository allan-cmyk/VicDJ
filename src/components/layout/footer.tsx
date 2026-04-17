import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { InstagramIcon, FacebookIcon } from "@/components/ui/social-icons"
import { Logo } from "./logo"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden border-t border-ivory/8 bg-ink">
      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10 lg:px-14 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-6">
            <Logo />
            <p className="text-ivory/60 max-w-sm leading-relaxed">
              Austin-based DJ &amp; entertainment production. Weddings, corporate, nightlife and cruise — since {siteConfig.since}.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href={siteConfig.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @djtr3y"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 hover:text-champagne hover:border-champagne transition-colors"
              >
                <InstagramIcon size={15} />
              </Link>
              <Link
                href={siteConfig.socials.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook AVProz"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-ivory/15 px-4 text-[11px] font-mono uppercase tracking-[0.2em] text-ivory/70 hover:text-champagne hover:border-champagne transition-colors"
              >
                <FacebookIcon size={13} />
                Facebook
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-champagne">
              Explore
            </h3>
            <ul className="space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ivory/70 hover:text-champagne transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-champagne">
              Contact
            </h3>
            <ul className="space-y-3 text-ivory/70">
              <li>
                <Link href={siteConfig.contact.phoneHref} className="inline-flex items-center gap-3 hover:text-champagne transition-colors">
                  <Phone size={14} className="text-champagne/70" />
                  <span className="font-mono text-sm tracking-wide">{siteConfig.contact.phone}</span>
                </Link>
              </li>
              <li>
                <Link href={siteConfig.contact.emailHref} className="inline-flex items-center gap-3 hover:text-champagne transition-colors">
                  <Mail size={14} className="text-champagne/70" />
                  <span className="text-sm">{siteConfig.contact.email}</span>
                </Link>
              </li>
              <li className="inline-flex items-center gap-3">
                <MapPin size={14} className="text-champagne/70" />
                <span className="text-sm">{siteConfig.location.city}, {siteConfig.location.region}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 md:flex-row items-start md:items-center justify-between border-t border-ivory/8 pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/40">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/40">
            Austin · {siteConfig.location.region}
          </p>
        </div>
      </div>
    </footer>
  )
}
