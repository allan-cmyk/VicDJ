import { cn } from "@/lib/utils"

interface EyebrowLabelProps {
  children: React.ReactNode
  className?: string
  as?: "span" | "p" | "div"
}

export function EyebrowLabel({ children, className, as: Tag = "span" }: EyebrowLabelProps) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-champagne",
        className
      )}
    >
      <span aria-hidden className="h-px w-6 bg-champagne/60" />
      {children}
    </Tag>
  )
}
