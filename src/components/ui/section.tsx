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
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" />
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
