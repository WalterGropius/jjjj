'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Custom cursor: a 30° tilted up-left arrow built from three brand-red
 * strokes (shaft + two head strokes). The hot-spot is the tip of the
 * arrow — that's the point that aligns with the actual cursor location.
 *
 * On hover, the two head strokes don't change angle; instead they slide
 * down the shaft, opening a gap between the bare tip and the head. This
 * reveals the three-line construction without changing the silhouette.
 *
 * Always brand red (no mix-blend-difference) so the colour is identical
 * in light + dark mode. Disabled on touch (pointer:fine).
 */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.18 })
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.18 })

  // Pixel offset of the head V away from the tip (along the shaft).
  // Idle = 0 (touching tip). Hover = 10 (clear gap).
  const gap = useMotionValue(0)
  const sGap = useSpring(gap, { stiffness: 280, damping: 22 })

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
      gap.set(interactive ? 11 : 0)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [enabled, x, y, gap])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      style={{ translateX: sx, translateY: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[60]"
    >
      {/* Tip is at SVG (0,0); we draw the body extending down. The whole arrow
          is rotated -30° so it leans like a traditional cursor. */}
      <svg
        width="56"
        height="64"
        viewBox="-28 0 56 64"
        className="block overflow-visible"
        style={{ transform: 'rotate(-30deg)', transformOrigin: '0 0' }}
      >
        {/* Vertical shaft from the tip down */}
        <line
          x1={0}
          y1={0}
          x2={0}
          y2={42}
          stroke="#ff3427"
          strokeWidth={6}
          strokeLinecap="square"
        />
        {/* Two head strokes — slide DOWN the shaft on hover (gap from tip) */}
        <ArrowHead side="left" gap={sGap} />
        <ArrowHead side="right" gap={sGap} />
      </svg>
    </motion.div>
  )
}

function ArrowHead({
  side,
  gap
}: {
  side: 'left' | 'right'
  gap: ReturnType<typeof useMotionValue<number>>
}) {
  // Head stroke at fixed 28° from the shaft, length 14.
  const sign = side === 'left' ? -1 : 1
  const headLen = 14
  const headAngle = (28 * Math.PI) / 180
  const dx = sign * headLen * Math.sin(headAngle)
  const dy = headLen * Math.cos(headAngle)

  // y1 is the inner end (anchored at the tip + gap). y2 is the outer end.
  const y1 = useTransform(gap, (g) => g)
  const y2 = useTransform(gap, (g) => g + dy)

  return (
    <motion.line
      x1={0}
      y1={y1}
      x2={dx}
      y2={y2}
      stroke="#ff3427"
      strokeWidth={6}
      strokeLinecap="square"
    />
  )
}
