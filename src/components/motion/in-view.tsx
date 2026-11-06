"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"

export type InViewTag = "div" | "section" | "article" | "header" | "footer" | "h1" | "h2" | "h3" | "p"

interface InViewProps extends ComponentPropsWithoutRef<"div"> {
  as?: InViewTag
  /** Fraction of the element that must be visible before it counts as in view. */
  amount?: number
}

/**
 * Sets `data-inview` on its element the first time it scrolls into view. All the
 * animation lives in globals.css, so this is the only JavaScript a reveal needs.
 */
export function InView({ as = "div", amount = 0.25, ...rest }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.inview = ""
        observer.disconnect()
      },
      { threshold: amount }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [amount])

  const Tag = as as "div"
  return <Tag ref={ref} {...rest} />
}
