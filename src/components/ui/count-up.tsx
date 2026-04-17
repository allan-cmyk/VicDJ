"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface CountUpProps {
  /** The final rendered value, e.g. "250+" or "2008" or "38". */
  value: string
  /** Duration in ms. Default 1600. */
  duration?: number
  className?: string
}

/**
 * Counts up from 0 to the numeric portion of `value` when scrolled into view.
 * Preserves any non-numeric suffix (+, K, etc.) and leading zero-pad (e.g. "2008").
 * Uses an intersection-observer + a spring so it feels mechanical, not linear.
 */
export function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()

  // Split the value into numeric + trailing suffix (e.g. "250+" → {num:250, suffix:"+"})
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ""
  const pad = match ? match[1].length : 0

  const mv = useMotionValue(0)
  const spring = useSpring(mv, {
    damping: 30,
    stiffness: 90,
    mass: 1,
  })
  const rounded = useTransform(spring, (latest) =>
    Math.round(latest).toString().padStart(pad, "0")
  )

  const [displayed, setDisplayed] = useState(pad > 0 ? "0".padStart(pad, "0") : "0")

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplayed(match ? match[1] : value)
      return
    }
    mv.set(target)
    const unsub = rounded.on("change", (v) => setDisplayed(v))
    // Safety fallback: ensure final value after duration even if spring over/undershoots.
    const t = window.setTimeout(() => {
      setDisplayed(match ? match[1] : value)
    }, duration + 400)
    return () => {
      unsub()
      window.clearTimeout(t)
    }
  }, [inView, reduced, target, duration, mv, rounded, match, value, pad])

  if (!match) {
    // Not numeric — render as-is.
    return <span ref={ref} className={className}>{value}</span>
  }

  return (
    <motion.span ref={ref} className={className}>
      {displayed}
      {suffix}
    </motion.span>
  )
}
