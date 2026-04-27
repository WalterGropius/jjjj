'use client'

import { ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Props = {
  href: string
  children: ReactNode
  className?: string
  /** Pixels of magnetic pull toward cursor (max). */
  pull?: number
  external?: boolean
}

/**
 * Magnetic CTA pill — leans toward the cursor when nearby.
 * Premium hover feel without being gaudy.
 */
export function MagneticPill({ href, children, className = '', pull = 14, external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = (e.clientX - cx) / (r.width / 2)
    const dy = (e.clientY - cy) / (r.height / 2)
    x.set(Math.max(-1, Math.min(1, dx)) * pull)
    y.set(Math.max(-1, Math.min(1, dy)) * pull)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`group pill ${className}`}
    >
      {children}
    </motion.a>
  )
}
