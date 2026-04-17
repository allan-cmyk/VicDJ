/**
 * Motion language for AV Productionz — cinematic dark-luxe.
 * Slow, confident reveals. Reduced-motion respects OS preference.
 */

export const EASING = {
  reveal: [0.19, 1, 0.22, 1] as [number, number, number, number],
  interactive: [0.22, 1, 0.36, 1] as [number, number, number, number],
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
}

export const DURATION = {
  reveal: 0.8,
  page: 0.5,
  stagger: 0.12,
}

export const TRANSFORM = {
  reveal: {
    y: 24,
    opacity: 0,
  },
  parallax: {
    min: -30,
    max: 30,
  },
}
