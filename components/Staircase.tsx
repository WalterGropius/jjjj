'use client'

import { motion } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'

type Props = {
  top: string
  bottom: string
  topColor?: string
  bottomColor?: string
  lineColor?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes: Record<NonNullable<Props['size']>, string> = {
  sm: 'text-[clamp(1.4rem,3.2vw,2.6rem)]',
  md: 'text-[clamp(1.8rem,4vw,3.4rem)]',
  lg: 'text-[clamp(2.2rem,5vw,4.6rem)]',
  xl: 'text-[clamp(3rem,8vw,7.5rem)]'
}

/**
 * Brand staircase: bottom word's FIRST letter sits directly under top word's
 * LAST letter (manual page 18). Measured at runtime so any pair fits.
 */
export function Staircase({
  top,
  bottom,
  topColor,
  bottomColor,
  lineColor,
  size = 'lg',
  className = ''
}: Props) {
  const topMeasureRef = useRef<HTMLSpanElement>(null)
  const lastCharRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useLayoutEffect(() => {
    const recompute = () => {
      if (!topMeasureRef.current || !lastCharRef.current) return
      const topW = topMeasureRef.current.getBoundingClientRect().width
      const lastW = lastCharRef.current.getBoundingClientRect().width
      setOffset(Math.max(0, topW - lastW))
    }
    recompute()
    const ro = new ResizeObserver(recompute)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', recompute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', recompute)
    }
  }, [top, bottom, size])

  return (
    <div
      ref={containerRef}
      className={`relative w-full font-display font-black uppercase leading-[0.9] tracking-tightest ${sizes[size]} ${className}`}
    >
      {/* Top word — block for layout, inline-block child for accurate measurement */}
      <span className="block pt-[0.18em]" style={{ color: topColor ?? 'var(--fg)' }}>
        <span ref={topMeasureRef} className="inline-block whitespace-nowrap">
          {top}
        </span>
      </span>

      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.05, ease: [0.85, 0, 0.15, 1] }}
        style={{ background: lineColor ?? 'var(--rule)', transformOrigin: 'left' }}
        className="my-[0.07em] block h-[0.07em] w-full"
      />

      <span
        className="block whitespace-nowrap pt-[0.18em]"
        style={{ color: bottomColor ?? 'var(--accent)', paddingLeft: `${offset}px` }}
      >
        {bottom}
      </span>

      {/* Hidden probe to measure last-letter width at the actual rendered size */}
      <span aria-hidden className="invisible absolute left-0 top-0 -z-10 inline-block whitespace-nowrap">
        <span ref={lastCharRef}>{top.slice(-1)}</span>
      </span>
    </div>
  )
}
