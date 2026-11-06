"use client"

import { useEffect, useRef } from "react"

interface CountUpProps {
  /** The final rendered value, e.g. "250+" or "2008" or "38". */
  value: string
  /** Duration in ms. Default 1600. */
  duration?: number
  className?: string
}

/**
 * Counts up to `value` when scrolled into view. The real value is what renders on
 * the server, so crawlers and no-JS visitors read "250+", never a placeholder zero.
 * The zeroed start is applied in the browser only, on an element still off screen.
 */
export function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const match = value.match(/^(\d+)(.*)$/)
    if (!el || !match) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const [, digits, suffix] = match
    const target = parseInt(digits, 10)
    const format = (n: number) => `${Math.round(n).toString().padStart(digits.length, "0")}${suffix}`

    el.textContent = format(0)

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const startedAt = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1)
          el.textContent = format(target * (1 - (1 - progress) ** 4))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      el.textContent = value
    }
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
