import "server-only"

import { isValidElement, type CSSProperties, type ReactNode } from "react"
import { InView } from "@/components/motion/in-view"

interface TextMaskRevealProps {
  children: ReactNode
  className?: string
  /** HTML tag to render as. */
  as?: "h1" | "h2" | "h3" | "p" | "div"
}

type Token = { kind: "word"; text: string } | { kind: "space"; text: string } | { kind: "node"; node: ReactNode }

function tokenize(node: ReactNode, tokens: Token[] = []): Token[] {
  if (node == null || typeof node === "boolean") return tokens
  if (typeof node === "string" || typeof node === "number") {
    for (const part of String(node).split(/(\s+)/)) {
      if (part) tokens.push({ kind: /\S/.test(part) ? "word" : "space", text: part })
    }
    return tokens
  }
  if (Array.isArray(node)) {
    node.forEach((child) => tokenize(child, tokens))
    return tokens
  }
  tokens.push({ kind: "node", node })
  return tokens
}

function plainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(plainText).join("")
  if (isValidElement<{ children?: ReactNode }>(node)) return plainText(node.props.children)
  return ""
}

/**
 * Splits children into words and raises each one from behind a mask. Nested
 * elements such as <em> stay whole.
 *
 * The heading text is in the HTML once, so crawlers read it once. Screen readers
 * get the full phrase from aria-label instead of word by word.
 *
 * Server-only on purpose: plainText() reads React elements, and doing that on both
 * server and client caused hydration mismatches before (commit 865ed05). Client
 * components should take the heading as a prop, as HighlightsCarousel does.
 */
export function TextMaskReveal({ children, className, as = "h2" }: TextMaskRevealProps) {
  return (
    <InView as={as} amount={0.4} data-mask="" aria-label={plainText(children)} className={className}>
      <span aria-hidden>
        {tokenize(children).map((token, i) =>
          token.kind === "space" ? (
            <span key={i}>{token.text}</span>
          ) : (
            <span key={i} className="mask-word">
              <span style={{ "--i": i } as CSSProperties}>
                {token.kind === "word" ? token.text : token.node}
              </span>
            </span>
          )
        )}
      </span>
    </InView>
  )
}
