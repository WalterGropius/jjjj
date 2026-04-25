'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  id: string
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, children, className = '' }: Props) {
  return (
    <section id={id} className={`relative scroll-mt-24 px-6 py-24 md:px-10 md:py-36 ${className}`}>
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-6 inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-line-red">
              <span aria-hidden className="h-px w-8 bg-line-red" />
              {eyebrow}
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.92] tracking-tightest text-line-white">
              {title}
            </h2>
          </motion.div>
        </div>
        <div className="md:col-span-8 md:col-start-6">{children}</div>
      </div>
    </section>
  )
}

export function StaircaseHeading({ top, bottom }: { top: string; bottom: string }) {
  return (
    <span className="block">
      <span className="block">{top}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
        style={{ transformOrigin: 'left' }}
        className="my-1 block h-[0.06em] w-full bg-line-red"
      />
      <span className="block pl-[15%] text-line-red">{bottom}</span>
    </span>
  )
}
