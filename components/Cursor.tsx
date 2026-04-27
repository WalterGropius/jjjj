'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Custom cursor: a static up-arrow made of three brand-red strokes —
 * vertical shaft + two head lines forming the tip. The cursor never rotates;
 * on hover the two head strokes splay wider, revealing the three-line
 * construction. Always brand red (no mix-blend-difference) so the colour is
 * consistent in light + dark mode. Disabled on touch devices.
 */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.18 })
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.18 })

  // Idle = a tight arrow tip; hover = wide splay that visually breaks the
  // shape into its three constituent strokes.
  const spread = useMotionValue(18)
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
      spread.set(interactive ? 78 : 18)
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
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <svg width="64" height="64" viewBox="-32 -32 64 64" className="block overflow-visible">
          {/* Vertical shaft — never changes length */}
          <line
            x1={0}
            y1={-18}
            x2={0}
            y2={18}
            stroke="#ff3427"
            strokeWidth={6}
            strokeLinecap="square"
          />
          {/* Two head strokes — splay wider on hover */}
          <ArrowHead side="left" spread={sSpread} />
          <ArrowHead side="right" spread={sSpread} />
        </svg>
      </div>
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
  // Tip is at (0, -18); head stroke runs back-and-out by 14 units along an
  // angle = 180° - spread (measured from the +y axis going downward).
  const x2 = useTransform(spread, (s) => sign * 14 * Math.sin((s * Math.PI) / 180))
  const y2 = useTransform(spread, (s) => -18 + 14 * Math.cos((s * Math.PI) / 180))

  return (
    <motion.line
      x1={0}
      y1={-18}
      x2={x2}
      y2={y2}
      stroke="#ff3427"
      strokeWidth={6}
      strokeLinecap="square"
    />
  )
}
