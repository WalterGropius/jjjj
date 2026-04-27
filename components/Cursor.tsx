'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Custom cursor — three brand-red strokes.
 *
 *   • The arrow's TIP is the mouse hot-spot. The whole arrow is then
 *     lifted by `LIFT` pixels so the body never sits on top of the thing
 *     being pointed at.
 *   • The whole arrow is rotated -30° around the tip so it reads as a
 *     real cursor.
 *   • The V angle is FIXED (30° total — 15° per side). On hover the
 *     two head strokes don't change angle or length: they translate
 *     outward perpendicular to the shaft, opening a gap between the
 *     shaft and each head and revealing the three-line construction.
 *
 * Always brand red — identical in light + dark. Disabled on touch.
 */

const LIFT = 12 // px the visible arrow rises above the actual mouse position

export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.18 })
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.18 })

  // Translation in SVG units of each head stroke perpendicular to the shaft.
  // Idle = 0 (V meets at the tip). Hover = ~10 (clear gap on both sides).
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
        SVG (0,0) is the tip. We render the arrow LIFT px above the
        motion.div origin so the body does not occlude what's under the
        actual cursor location.
      */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        className="block"
        style={{ overflow: 'visible', transform: `translateY(-${LIFT}px)` }}
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
          {/* Two head strokes — fixed 15° each from the shaft. They keep
              orientation and length; they only translate outward on hover. */}
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
  const headLen = 14
  const halfSpread = (15 * Math.PI) / 180 // half of the 30° V

  // Vector along the head stroke (from inner end → outer end).
  const dx = sign * headLen * Math.sin(halfSpread)
  const dy = headLen * Math.cos(halfSpread)

  // Inner end translates outward by `sep` (perpendicular to the shaft).
  const x1 = useTransform(sep, (g) => sign * g)
  const x2 = useTransform(sep, (g) => sign * g + dx)

  return (
    <motion.line
      x1={x1}
      y1={0}
      x2={x2}
      y2={dy}
      stroke="#ff3427"
      strokeWidth={6}
      strokeLinecap="square"
    />
  )
}
