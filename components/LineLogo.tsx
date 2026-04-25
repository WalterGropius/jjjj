'use client'

import { motion } from 'framer-motion'

type Variant = 'redOnBlue' | 'redOnWhite' | 'whiteOnBlue' | 'whiteOnRed' | 'blueOnWhite'

type Props = {
  variant?: Variant
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
  className?: string
}

const palette: Record<Variant, { word: string; line: string }> = {
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
 * Manual rule: LINE sits top-left, EVENTS sits bottom-right.
 * The line spans only the wordmark width (not the parent container).
 * The two words horizontally overlap by ~one letter, like the wordmark.
 */
export function LineLogo({ variant = 'redOnBlue', size = 'md', animate = false, className = '' }: Props) {
  const c = palette[variant]
  return (
    <span
      className={`relative inline-block font-display font-black leading-[0.86] tracking-tightest ${sizes[size]} ${className}`}
    >
      <span className="block">
        <span className="block" style={{ color: c.word }}>
          LINE
        </span>
        <motion.span
          aria-hidden
          initial={animate ? { scaleX: 0 } : { scaleX: 1 }}
          animate={animate ? { scaleX: 1 } : undefined}
          transition={{ duration: 1.0, ease: [0.85, 0, 0.15, 1] }}
          style={{
            background: c.line,
            transformOrigin: 'left',
            display: 'block',
            height: '0.085em',
            width: '116%',
            marginTop: '0.04em',
            marginBottom: '0.04em',
            marginLeft: '-0.04em'
          }}
        />
        <span className="block pl-[0.92em]" style={{ color: c.word }}>
          EVENTS
        </span>
      </span>
      <span className="sr-only">LINE EVENTS</span>
    </span>
  )
}
