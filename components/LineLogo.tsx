'use client'

import { motion } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'

type Variant = 'auto' | 'redOnBlue' | 'redOnWhite' | 'whiteOnBlue' | 'whiteOnRed' | 'blueOnWhite'

type Props = {
  variant?: Variant
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
  className?: string
}

const palette: Record<Exclude<Variant, 'auto'>, { word: string; line: string }> = {
  redOnBlue: { word: '#ff3427', line: '#ff3427' },
  redOnWhite: { word: '#ff3427', line: '#ff3427' },
  whiteOnBlue: { word: '#ffffff', line: '#ffffff' },
  whiteOnRed: { word: '#ffffff', line: '#ffffff' },
  blueOnWhite: { word: '#240f5a', line: '#240f5a' }
}

const sizes = {
  xs: 'text-[0.95rem]',
  sm: 'text-[1.15rem]',
  md: 'text-[clamp(1.6rem,2.2vw,2.2rem)]',
  lg: 'text-[clamp(2.4rem,4vw,4rem)]',
  xl: 'text-[clamp(4rem,9vw,9rem)]'
}

/**
 * LINE / EVENTS wordmark per manual pages 2–11.
 * - Top-left LINE
 * - Red rule (line spans the wordmark width)
 * - EVENTS shifted so its FIRST E sits under the LAST E of LINE
 */
export function LineLogo({ variant = 'auto', size = 'md', animate = false, className = '' }: Props) {
  const c = variant === 'auto' ? null : palette[variant]
  const top = 'LINE'
  const bottom = 'EVENTS'

  const topRef = useRef<HTMLSpanElement>(null)
  const lastRef = useRef<HTMLSpanElement>(null)
  const [offset, setOffset] = useState(0)

  useLayoutEffect(() => {
    const recompute = () => {
      if (!topRef.current || !lastRef.current) return
      const topW = topRef.current.getBoundingClientRect().width
      const lastW = lastRef.current.getBoundingClientRect().width
      setOffset(Math.max(0, topW - lastW))
    }
    recompute()
    window.addEventListener('resize', recompute)
    return () => window.removeEventListener('resize', recompute)
  }, [size])

  const wordColor = c ? c.word : 'var(--accent)'
  const lineColor = c ? c.line : 'var(--accent)'

  return (
    <span
      className={`relative inline-block font-display font-black leading-[0.86] tracking-tightest ${sizes[size]} ${className}`}
    >
      <span className="block" style={{ color: wordColor }}>
        <span ref={topRef} className="inline-block whitespace-nowrap">
          {top}
        </span>
      </span>
      <motion.span
        aria-hidden
        initial={animate ? { scaleX: 0 } : { scaleX: 1 }}
        animate={animate ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.0, ease: [0.85, 0, 0.15, 1] }}
        style={{
          background: lineColor,
          transformOrigin: 'left',
          display: 'block',
          height: '0.085em',
          marginTop: '0.04em',
          marginBottom: '0.04em'
        }}
        className="w-full"
      />
      <span
        className="block whitespace-nowrap"
        style={{ color: wordColor, paddingLeft: `${offset}px` }}
      >
        {bottom}
      </span>

      <span aria-hidden className="invisible absolute left-0 top-0 -z-10 whitespace-nowrap">
        <span ref={lastRef}>{top.slice(-1)}</span>
      </span>
      <span className="sr-only">LINE EVENTS</span>
    </span>
  )
}
