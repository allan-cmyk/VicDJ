"use client"

import { useEffect, useRef, useState } from "react"
import { siteConfig } from "@/lib/site-config"
import { usePromoBannerVisible } from "@/components/layout/promo-banner"
import s from "./press.module.css"

/** Copies the text of the element with `targetId` and shows a short "Copied" note. */
export function CopyButton({ targetId }: { targetId: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  async function copy() {
    const text = document.getElementById(targetId)?.innerText.trim() ?? ""
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return
    }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1400)
  }

  return (
    <button type="button" className={`${s.btn} ${s.sm}`} onClick={copy}>
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  )
}

/** The current offer, shown under the hero buttons until the offer's end date (same switch as the site banner). */
export function PressPromo() {
  const show = usePromoBannerVisible()
  if (!show) return null
  return (
    <a className={s.promo} href="#book">
      {siteConfig.promoBanner.message}
    </a>
  )
}

type Mix = { title: string; sub?: string; src: string }

/** One audio player per mix; only one plays at a time. */
export function MixList({ mixes }: { mixes: readonly Mix[] }) {
  const refs = useRef<(HTMLAudioElement | null)[]>([])
  const [playing, setPlaying] = useState<number | null>(null)
  const [progress, setProgress] = useState<number[]>(() => mixes.map(() => 0))
  const [minutes, setMinutes] = useState<(number | null)[]>(() => mixes.map(() => null))

  function toggle(i: number) {
    const audio = refs.current[i]
    if (!audio) return
    refs.current.forEach((other, j) => {
      if (j !== i) other?.pause()
    })
    if (audio.paused) void audio.play()
    else audio.pause()
  }

  return (
    <div className={s.tracks}>
      {mixes.map((m, i) => (
        <div key={m.src} className={s.track}>
          <button
            type="button"
            className={s.play}
            aria-label={`${playing === i ? "Pause" : "Play"} ${m.title}`}
            onClick={() => toggle(i)}
          >
            {playing === i ? "❚❚" : "▶"}
          </button>
          <div className={s.meta}>
            <div className={s.t}>{m.title}</div>
            <div className={s.sub}>
              {[m.sub, minutes[i] ? `${minutes[i]} min` : null].filter(Boolean).join(" · ")}
            </div>
            <progress
              className={s.bar}
              value={progress[i]}
              max={1}
              aria-label={`${m.title} progress`}
              onClick={(e) => {
                const audio = refs.current[i]
                if (!audio?.duration) return
                const r = e.currentTarget.getBoundingClientRect()
                audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration
              }}
            />
          </div>
          <a className={s.dl} href={m.src} download>
            Download
          </a>
          <audio
            ref={(el) => {
              refs.current[i] = el
            }}
            src={m.src}
            preload="metadata"
            onPlay={() => setPlaying(i)}
            onPause={() => setPlaying((p) => (p === i ? null : p))}
            onLoadedMetadata={(e) => {
              const mins = Math.round(e.currentTarget.duration / 60)
              setMinutes((prev) => prev.map((v, j) => (j === i ? mins || null : v)))
            }}
            onTimeUpdate={(e) => {
              const a = e.currentTarget
              if (!a.duration) return
              setProgress((prev) => prev.map((v, j) => (j === i ? a.currentTime / a.duration : v)))
            }}
          />
        </div>
      ))}
    </div>
  )
}
