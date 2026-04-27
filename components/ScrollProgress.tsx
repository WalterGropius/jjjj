'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Vertical line on the right edge that fills as the page scrolls.
 * The line is the brand element — make it the page's narrator.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const v = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 right-3 z-40 hidden w-px bg-line md:block"
    >
      <motion.div
        style={{ scaleY: v, transformOrigin: 'top' }}
        className="h-full w-full origin-top bg-accent"
      />
    </div>
  )
}
