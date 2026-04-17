"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface TextMaskRevealProps {
  children: React.ReactNode
  className?: string
  /** Stagger between words (seconds). */
  stagger?: number
  /** Per-word duration (seconds). */
  duration?: number
  /** HTML tag to render as. */
  as?: "h1" | "h2" | "h3" | "p" | "div"
}

/**
 * Splits plain-text children into words and reveals each one by rising out
 * from behind an invisible mask. Preserves nested React nodes (e.g. <em>)
 * as atomic units so inline emphasis still works.
 *
 * Accessibility: the full text is rendered in a visually-hidden sibling
 * so screen readers read one continuous phrase, not word-by-word.
 */
export function TextMaskReveal({
  children,
  className,
  stagger = 0.06,
  duration = 0.8,
  as: Tag = "h2",
}: TextMaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduced = useReducedMotion()

  // Split children into an array of "tokens" — each is either a plain word
  // or a React element (kept atomic).
  const tokens: Array<{ kind: "word"; text: string } | { kind: "node"; node: React.ReactNode }> = []

  const walk = (node: React.ReactNode): void => {
    if (node == null || typeof node === "boolean") return
    if (typeof node === "string" || typeof node === "number") {
      for (const w of String(node).split(/(\s+)/)) {
        if (!w) continue
        tokens.push({ kind: "word", text: w })
      }
      return
    }
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    tokens.push({ kind: "node", node })
  }
  walk(children)

  if (reduced) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag ref={ref as never} className={cn("relative", className)}>
      <span className="sr-only">{stringify(children)}</span>
      <span aria-hidden className="inline">
        {tokens.map((t, i) =>
          t.kind === "word" && /\S/.test(t.text) ? (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                initial={{ y: "110%" }}
                animate={inView ? { y: 0 } : { y: "110%" }}
                transition={{ duration, delay: i * stagger, ease: [0.19, 1, 0.22, 1] }}
                className="inline-block"
              >
                {t.text}
              </motion.span>
            </span>
          ) : t.kind === "word" ? (
            // whitespace — keep as a literal space so words don't run together
            <span key={i}>{t.text}</span>
          ) : (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                initial={{ y: "110%" }}
                animate={inView ? { y: 0 } : { y: "110%" }}
                transition={{ duration, delay: i * stagger, ease: [0.19, 1, 0.22, 1] }}
                className="inline-block"
              >
                {t.node}
              </motion.span>
            </span>
          )
        )}
      </span>
    </Tag>
  )
}

function stringify(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(stringify).join("")
  if (typeof node === "object" && node && "props" in node) {
    const p = (node as { props: { children?: React.ReactNode } }).props
    return stringify(p.children)
  }
  return ""
}
