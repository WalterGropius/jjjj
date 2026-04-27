'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Custom cursor — three brand-red strokes forming a tilted arrow.
 *
 *   • The arrow's TIP is the hot-spot. It sits exactly at the mouse's
 *     (clientX, clientY) so the selection point is where the user is
 *     pointing — not the centre of the SVG.
 *   • The whole arrow is rotated -30° around the tip so it reads as a
 *     real cursor (leans toward upper-left).
 *   • Shaft length never changes. On hover the two head strokes simply
 *     splay wider (open the V), revealing the three-line construction.
 *
 * Always brand red — no mix-blend-difference, identical in light + dark.
 * Disabled on touch (pointer:fine).
 */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.18 })
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.18 })

  // Half-spread, in degrees, of each head stroke from the shaft.
  // Idle = tight V; hover = wide-open V (capped so neither stroke
  // flips above horizontal once the whole arrow is tilted -30°).
  const spread = useMotionValue(24)
  const sSpread = useSpring(spread, { stiffness: 260, damping: 22 })

  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.body.classList.add('with-cursor')
    return () => document.body.classList.remove('with-cursor')
  }, [])

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const interactive = !!t.closest('a, button, [data-cursor="hover"]')
      spread.set(interactive ? 52 : 24)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [enabled, x, y, spread])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      style={{ translateX: sx, translateY: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[60]"
    >
      {/*
        SVG sits with its (0,0) coordinate at the motion.div's origin (the
        mouse position). All shapes are drawn relative to (0,0) — the tip.
        overflow:visible lets the rotated body extend past the SVG's bbox
        without being clipped.
      */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        className="block"
        style={{ overflow: 'visible' }}
      >
        {/* Rotate the whole arrow -30° around the TIP at (0,0) */}
        <g transform="rotate(-30 0 0)">
          {/* Shaft — fixed length, points straight down from the tip in
              the unrotated frame; rotation makes it lean down-right. */}
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={42}
            stroke="#ff3427"
            strokeWidth={6}
            strokeLinecap="square"
          />
          {/* Two head strokes from the tip — V opens wider on hover */}
          <ArrowHead side="left" spread={sSpread} />
          <ArrowHead side="right" spread={sSpread} />
        </g>
      </svg>
    </motion.div>
  )
}

function ArrowHead({
  side,
  spread
}: {
  side: 'left' | 'right'
  spread: ReturnType<typeof useMotionValue<number>>
}) {
  const sign = side === 'left' ? -1 : 1
  const headLen = 14

  const x2 = useTransform(spread, (s) => sign * headLen * Math.sin((s * Math.PI) / 180))
  const y2 = useTransform(spread, (s) => headLen * Math.cos((s * Math.PI) / 180))

  return (
    <motion.line
      x1={0}
      y1={0}
      x2={x2}
      y2={y2}
      stroke="#ff3427"
      strokeWidth={6}
      strokeLinecap="square"
    />
  )
}
