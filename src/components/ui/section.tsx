import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  children: React.ReactNode
  className?: string
  as?: "section" | "div"
  container?: boolean
  tone?: "ink" | "ink-soft"
}

export function Section({
  id,
  children,
  className,
  as: Tag = "section",
  container = true,
  tone = "ink",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative overflow-hidden",
        tone === "ink" ? "bg-ink" : "bg-ink-soft",
        "py-28 lg:py-40",
        className
      )}
    >
      {/* grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />
      {container ? (
        <div className="relative mx-auto w-full max-w-[1320px] px-6 md:px-10 lg:px-14">
          {children}
        </div>
      ) : (
        children
      )}
    </Tag>
  )
}
