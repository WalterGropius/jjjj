'use client'

import { motion } from 'framer-motion'

type Props = {
  top: string
  bottom: string
  topColor?: string
  bottomColor?: string
  lineColor?: string
  /** Right-shift fraction of container width applied to the bottom word.
   *  Manual rule: words horizontally overlap by ~one letter. */
  shift?: number
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
 * Brand-manual staircase headline (page 18):
 * Top word left-aligned · red line spans container · bottom word right-shifted.
 */
export function Staircase({
  top,
  bottom,
  topColor = '#ffffff',
  bottomColor = '#ff3427',
  lineColor = '#ff3427',
  shift = 0.18,
  size = 'lg',
  className = ''
}: Props) {
  return (
    <div
      className={`block w-full font-display font-black uppercase leading-[0.92] tracking-tightest ${sizes[size]} ${className}`}
    >
      <span className="block whitespace-nowrap pt-[0.2em]" style={{ color: topColor }}>
        {top}
      </span>

      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.05, ease: [0.85, 0, 0.15, 1] }}
        style={{ background: lineColor, transformOrigin: 'left' }}
        className="my-[0.06em] block h-[0.075em] w-full"
      />

      <span
        className="block whitespace-nowrap pt-[0.2em] text-right"
        style={{ color: bottomColor, paddingLeft: `${shift * 100}%` }}
      >
        {bottom}
      </span>
    </div>
  )
}
