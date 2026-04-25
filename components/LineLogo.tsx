'use client'

import { motion } from 'framer-motion'

type Props = {
  variant?: 'redOnBlue' | 'blueOnWhite' | 'whiteOnBlue'
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
  className?: string
}

const palette = {
  redOnBlue: { word: '#ff3427', line: '#ff3427' },
  blueOnWhite: { word: '#240f5a', line: '#240f5a' },
  whiteOnBlue: { word: '#ffffff', line: '#ffffff' }
} as const

const sizes = {
  sm: 'text-[clamp(1.1rem,1.4vw,1.4rem)]',
  md: 'text-[clamp(1.6rem,2.2vw,2.2rem)]',
  lg: 'text-[clamp(2.4rem,4vw,4rem)]'
}

export function LineLogo({ variant = 'redOnBlue', size = 'md', animate = false, className = '' }: Props) {
  const c = palette[variant]
  return (
    <div className={`inline-flex flex-col font-display font-black leading-[0.85] tracking-tightest ${sizes[size]} ${className}`}>
      <span className="self-start" style={{ color: c.word }}>
        LINE
      </span>
      <motion.span
        aria-hidden
        initial={animate ? { scaleX: 0 } : { scaleX: 1 }}
        animate={animate ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1] }}
        style={{ background: c.line, transformOrigin: 'left' }}
        className="block h-[0.09em] w-full my-[0.09em]"
      />
      <span className="self-end" style={{ color: c.word }}>
        EVENTS
      </span>
    </div>
  )
}
