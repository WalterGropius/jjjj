'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Custom cursor — three brand-red strokes.
 *
 *   • The mouse hot-spot is the true pointer position (used for hover
 *     detection). The whole arrow is drawn `DROP` pixels BELOW it so the
 *     body never sits on top of the thing being pointed at.
 *   • The whole arrow is rotated -30° around the tip so it reads as a
 *     real cursor.
 *   • The V angle is FIXED (60° total — 30° per side). On hover the
 *     two head strokes keep their angle and grow LONGER while their
 *     inner ends nudge slightly off the shaft, opening a subtle gap
 *     from the stem while the arrowhead still reads as an arrow.
 *
 * Always brand red — identical in light + dark. Disabled on touch.
 */

const DROP = 16 // px the visible arrow sits below the actual mouse position

export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.18 })
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.18 })

  // Openness of the arrowhead. Idle = 0 (compact V). Hover = 18 (the head
  // strokes grow longer while their inner ends stay near the tip).
  const sep = useMotionValue(0)
  const sSep = useSpring(sep, { stiffness: 260, damping: 22 })

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
      // Detect whether the element directly under the pointer is interactive.
      // Doing it on mousemove is more reliable than mouseover, which can miss
      // transitions inside nested children with pointer-events:none.
      const t = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      const interactive = !!t?.closest('a, button, [data-cursor="hover"]')
      sep.set(interactive ? 18 : 0)
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [enabled, x, y, sep])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      style={{ translateX: sx, translateY: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[60]"
    >
      {/*
        SVG (0,0) is the tip. We render the arrow DROP px below the
        motion.div origin so the body does not occlude what's under the
        actual cursor location (which is what hover detection uses).
      */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        className="block"
        style={{ overflow: 'visible', transform: `translateY(${DROP}px)` }}
      >
        {/* Whole arrow rotates -30° around the tip */}
        <g transform="rotate(-30 0 0)">
          {/* Shaft — fixed */}
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={42}
            stroke="#ff3427"
            strokeWidth={6}
            strokeLinecap="square"
          />
          {/* Two head strokes — fixed 30° each from the shaft. On hover
              they grow longer while their inner ends stay near the tip. */}
          <ArrowHead side="left" sep={sSep} />
          <ArrowHead side="right" sep={sSep} />
        </g>
      </svg>
    </motion.div>
  )
}

function ArrowHead({
  side,
  sep
}: {
  side: 'left' | 'right'
  sep: ReturnType<typeof useMotionValue<number>>
}) {
  const sign = side === 'left' ? -1 : 1
  const halfSpread = (30 * Math.PI) / 180 // half of the 60° V

  // Length grows with openness; idle keeps the original compact head.
  const headLen = (g: number) => 14 + g * 0.9
  // Inner end stays near the tip but is nudged perpendicular to the shaft
  // so a subtle gap opens between each head and the stem on hover (idle
  // g=0 keeps them meeting at the tip).
  const innerX = (g: number) => sign * g * 0.45

  const x1 = useTransform(sep, innerX)
  const x2 = useTransform(
    sep,
    (g: number) => innerX(g) + sign * headLen(g) * Math.sin(halfSpread)
  )
  const y2 = useTransform(sep, (g: number) => headLen(g) * Math.cos(halfSpread))

  return (
    <motion.line
      x1={x1}
      y1={0}
      x2={x2}
      y2={y2}
      stroke="#ff3427"
      strokeWidth={6}
      strokeLinecap="square"
    />
  )
}
