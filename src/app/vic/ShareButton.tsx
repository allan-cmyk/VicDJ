"use client";

import { useEffect, useRef, useState } from "react";

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

/* Opens the phone's share sheet; where there isn't one (most desktop browsers), copies the link instead. */
export function ShareButton({ url, title, text, className }: { url: string; title: string; text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const [announce, setAnnounce] = useState("");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  async function share() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        // Closing the share sheet isn't an error. Anything else (blocked, unsupported data) falls back to copying.
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    if (await copy(url)) {
      timers.current.forEach((t) => window.clearTimeout(t));
      setCopied(true);
      // Empty the live region first, so a second copy is announced again.
      setAnnounce("");
      timers.current = [
        window.setTimeout(() => setAnnounce("Link copied"), 50),
        window.setTimeout(() => {
          setCopied(false);
          setAnnounce("");
        }, 2500),
      ];
    } else {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <>
      <button type="button" className={className} onClick={share} data-card="share">
        {copied ? "Link copied" : "Share"}
      </button>
      <span style={visuallyHidden} role="status">
        {announce}
      </span>
    </>
  );
}

async function copy(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Older browsers, or the clipboard API blocked: copy from a hidden text box.
    try {
      const box = document.createElement("textarea");
      box.value = value;
      box.setAttribute("readonly", "");
      box.style.position = "fixed";
      box.style.opacity = "0";
      document.body.appendChild(box);
      box.select();
      const ok = document.execCommand("copy");
      box.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
