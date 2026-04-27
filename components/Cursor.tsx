'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Custom cursor: an arrowhead made of three short red rules — shaft + two
 * head strokes. The angle between the head strokes opens / closes based on
 * hover state, and the whole arrow rotates toward the previous mouse-move
 * direction so the tip always leads the motion.
 *
 * Stroke is 6px (≈ 3× the brand line in the body). Disabled on touch via
 * `pointer:fine`.
 */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.18 })
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.18 })

  // Direction that the arrow points (radians). Smoothed so it doesn't jitter.
  const angle = useMotionValue(0)
  const sAngle = useSpring(angle, { stiffness: 220, damping: 22, mass: 0.4 })
  const rotate = useTransform(sAngle, (v) => `${(v * 180) / Math.PI}deg`)

  // Spread of the two arrowhead strokes (degrees from the shaft).
  const [active, setActive] = useState(false)
  const spread = useMotionValue(28)
  const sSpread = useSpring(spread, { stiffness: 280, damping: 22 })

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
    let lastX = 0
    let lastY = 0
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      x.set(e.clientX)
      y.set(e.clientY)
      // Only update angle when there's meaningful motion — prevents jitter on hover
      const dist = Math.hypot(dx, dy)
      if (dist > 1.4) angle.set(Math.atan2(dy, dx))
    }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const interactive = !!t.closest('a, button, [data-cursor="hover"]')
      setActive(interactive)
      spread.set(interactive ? 62 : 28)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [enabled, x, y, angle, spread])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      style={{ translateX: sx, translateY: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[60] mix-blend-difference"
    >
      <motion.div style={{ rotate }} className="relative -translate-x-1/2 -translate-y-1/2">
        <motion.svg
          width="64"
          height="64"
          viewBox="-32 -32 64 64"
          className="block"
          animate={{ width: active ? 80 : 64, height: active ? 80 : 64 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        >
          {/* Shaft */}
          <motion.line
            x1={-18}
            y1={0}
            x2={18}
            y2={0}
            stroke="#ff3427"
            strokeWidth={6}
            strokeLinecap="square"
          />
          {/* Top arrowhead */}
          <ArrowHead which="top" spread={sSpread} />
          {/* Bottom arrowhead */}
          <ArrowHead which="bottom" spread={sSpread} />
        </motion.svg>
      </motion.div>
    </motion.div>
  )
}

function ArrowHead({
  which,
  spread
}: {
  which: 'top' | 'bottom'
  spread: ReturnType<typeof useMotionValue<number>>
}) {
  // Convert degrees to a y-offset for the trailing point of the head stroke.
  const sign = which === 'top' ? -1 : 1
  const x2 = useTransform(spread, (s) => 18 - 14 * Math.cos((s * Math.PI) / 180))
  const y2 = useTransform(spread, (s) => sign * 14 * Math.sin((s * Math.PI) / 180))

  return (
    <motion.line
      x1={18}
      y1={0}
      x2={x2}
      y2={y2}
      stroke="#ff3427"
      strokeWidth={6}
      strokeLinecap="square"
    />
  )
}
