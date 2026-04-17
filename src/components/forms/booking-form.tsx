"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { bookingSchema, EVENT_TYPES, GUEST_COUNTS, BUDGETS, type BookingInput } from "@/types/booking"
import { Input, Textarea, Select } from "@/components/ui/field"
import { Button } from "@/components/ui/button"

type Status = "idle" | "submitting" | "success" | "error"

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState<string>("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      venue: "",
      message: "",
      website: "",
    },
    mode: "onBlur",
  })

  const onSubmit = async (values: BookingInput) => {
    setStatus("submitting")
    setErrorMsg("")
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || "Something went wrong — please try again.")
      }
      setStatus("success")
      reset()
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Unknown error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-champagne/30 bg-champagne/5 p-8 md:p-10">
        <div className="flex items-start gap-4">
          <CheckCircle2 size={22} className="mt-1 shrink-0 text-champagne" />
          <div className="space-y-2">
            <h3 className="font-display text-2xl text-ivory">Inquiry sent.</h3>
            <p className="text-ivory/70 leading-relaxed">
              Thanks for reaching out. Victor will be in touch within 24 hours at the email and phone you provided. For anything urgent, call{" "}
              <a href="tel:+13619452522" className="text-champagne hover:underline">361-945-2522</a>.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 text-[11px] font-mono uppercase tracking-[0.22em] text-champagne hover:underline"
            >
              Send another inquiry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input type="text" id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="name"
          label="Name"
          placeholder="Your full name"
          required
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="you@domain.com"
          required
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="phone"
          type="tel"
          label="Phone"
          placeholder="(___) ___-____"
          required
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          id="eventDate"
          type="date"
          label="Event date"
          required
          error={errors.eventDate?.message}
          {...register("eventDate")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          id="eventType"
          label="Event type"
          required
          placeholder="Select event type"
          options={EVENT_TYPES as unknown as string[]}
          error={errors.eventType?.message}
          {...register("eventType")}
        />
        <Input
          id="venue"
          label="Venue"
          placeholder="e.g., The Driskill"
          error={errors.venue?.message}
          {...register("venue")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          id="guestCount"
          label="Guest count"
          required
          placeholder="Approximate"
          options={GUEST_COUNTS as unknown as string[]}
          error={errors.guestCount?.message}
          {...register("guestCount")}
        />
        <Select
          id="budget"
          label="Budget"
          required
          placeholder="Rough range"
          options={BUDGETS as unknown as string[]}
          error={errors.budget?.message}
          {...register("budget")}
        />
      </div>

      <Textarea
        id="message"
        label="Tell us about the event"
        placeholder="Vibe, timeline, must-plays, anything else we should know…"
        error={errors.message?.message}
        {...register("message")}
      />

      {status === "error" ? (
        <div className="flex items-start gap-3 rounded-sm border border-[color:var(--error)]/40 bg-[color:var(--error)]/5 p-4">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-[color:var(--error)]" />
          <p className="text-sm text-ivory/80">{errorMsg}</p>
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-ivory/40 max-w-sm">
          By submitting, you agree to be contacted about your event. We never share your info.
        </p>
        <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting || status === "submitting"}>
          Send inquiry
        </Button>
      </div>
    </form>
  )
}
