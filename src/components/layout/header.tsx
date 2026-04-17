"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { InstagramIcon } from "@/components/ui/social-icons"
import { Logo } from "./logo"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open)
    return () => document.documentElement.classList.remove("overflow-hidden")
  }, [open])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ink/80 backdrop-blur-xl border-b border-ivory/8"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-6 md:px-10 lg:px-14 py-5">
        <Link href="/" aria-label={siteConfig.name} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne rounded-full">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/70 hover:text-champagne transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href={siteConfig.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @djtr3y"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 hover:text-champagne hover:border-champagne transition-colors"
          >
            <InstagramIcon size={15} />
          </Link>
          <Button asChild variant="primary" size="sm">
            <Link href="#booking">Book DJ Trey</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center text-ivory border border-ivory/15 rounded-full"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* mobile drawer */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-[69px] z-40 bg-ink transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div className="flex flex-col h-full px-6 py-12 gap-8">
          <nav className="flex flex-col gap-6">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-ivory hover:text-champagne transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-4 border-t border-ivory/10 pt-8">
            <Link
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center gap-3 text-ivory/70 hover:text-champagne"
            >
              <Phone size={14} />
              <span className="font-mono text-sm tracking-wide">{siteConfig.contact.phone}</span>
            </Link>
            <Link
              href={siteConfig.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-ivory/70 hover:text-champagne"
            >
              <InstagramIcon size={14} />
              <span className="font-mono text-sm tracking-wide">{siteConfig.socials.instagram.handle}</span>
            </Link>
            <Button asChild variant="primary" size="md" className="mt-4">
              <Link href="#booking" onClick={() => setOpen(false)}>Book DJ Trey</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
