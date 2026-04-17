import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const fieldBase =
  "w-full bg-ivory/[0.04] text-ivory placeholder:text-ivory/35 border border-ivory/12 focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/40 transition-colors duration-200"

interface FieldWrapProps {
  label?: string
  error?: string
  htmlFor?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FieldWrap({ label, error, htmlFor, required, children, className }: FieldWrapProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-[11px] font-mono uppercase tracking-[0.18em] text-ivory/60"
        >
          {label}
          {required ? <span aria-hidden className="text-champagne ml-1">*</span> : null}
        </label>
      )}
      {children}
      {error ? <p className="text-xs text-[color:var(--error)]">{error}</p> : null}
    </div>
  )
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hasError?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hasError, id, required, ...props }, ref) => {
    const showError = hasError || !!error
    return (
      <FieldWrap label={label} error={error} htmlFor={id} required={required}>
        <input
          id={id}
          ref={ref}
          aria-invalid={showError || undefined}
          required={required}
          className={cn(
            fieldBase,
            "h-12 px-4 rounded-sm text-base",
            showError && "border-[color:var(--error)] focus:border-[color:var(--error)]",
            className
          )}
          {...props}
        />
      </FieldWrap>
    )
  }
)
Input.displayName = "Input"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hasError?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hasError, id, required, ...props }, ref) => {
    const showError = hasError || !!error
    return (
      <FieldWrap label={label} error={error} htmlFor={id} required={required}>
        <textarea
          id={id}
          ref={ref}
          aria-invalid={showError || undefined}
          required={required}
          className={cn(
            fieldBase,
            "min-h-[140px] p-4 rounded-sm text-base resize-y",
            showError && "border-[color:var(--error)] focus:border-[color:var(--error)]",
            className
          )}
          {...props}
        />
      </FieldWrap>
    )
  }
)
Textarea.displayName = "Textarea"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hasError?: boolean
  options: readonly string[] | readonly { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hasError, id, required, options, placeholder, ...props }, ref) => {
    const showError = hasError || !!error
    return (
      <FieldWrap label={label} error={error} htmlFor={id} required={required}>
        <div className="relative">
          <select
            id={id}
            ref={ref}
            aria-invalid={showError || undefined}
            required={required}
            defaultValue={props.defaultValue ?? ""}
            className={cn(
              fieldBase,
              "h-12 pl-4 pr-10 rounded-sm text-base appearance-none cursor-pointer",
              showError && "border-[color:var(--error)] focus:border-[color:var(--error)]",
              className
            )}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled className="bg-ink">
                {placeholder}
              </option>
            ) : null}
            {options.map((opt) => {
              const value = typeof opt === "string" ? opt : opt.value
              const label = typeof opt === "string" ? opt : opt.label
              return (
                <option key={value} value={value} className="bg-ink text-ivory">
                  {label}
                </option>
              )
            })}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-3 w-3 text-champagne"
            viewBox="0 0 12 8"
            fill="none"
            aria-hidden
          >
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </FieldWrap>
    )
  }
)
Select.displayName = "Select"
