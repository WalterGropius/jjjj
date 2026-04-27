'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Staircase } from './Staircase'

type Props = {
  id: string
  number: string
  eyebrow: string
  headline: { top: string; bottom: string }
  intro?: ReactNode
  children?: ReactNode
  className?: string
  headlineSize?: 'md' | 'lg' | 'xl'
}

export function Section({
  id,
  number,
  eyebrow,
  headline,
  intro,
  children,
  className = '',
  headlineSize = 'lg'
}: Props) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 px-6 py-24 md:px-10 md:py-36 ${className}`}
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Section reveal: rule draws → meta row fades → staircase → intro */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
          style={{ transformOrigin: 'left' }}
          className="mb-10 h-px w-full bg-line-strong"
        />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-14 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-fg-faint"
        >
          <span className="flex items-center gap-3">
            <span className="text-accent">{number}</span>
            <span aria-hidden className="block h-px w-8 bg-accent" />
            {eyebrow}
          </span>
          <span className="hidden md:inline">LINE EVENTS · cs</span>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16 md:mb-24"
        >
          <Staircase top={headline.top} bottom={headline.bottom} size={headlineSize} />
          {intro && (
            <div className="mt-12 max-w-2xl text-[clamp(1rem,1.4vw,1.3rem)] font-medium leading-relaxed text-fg/85">
              {intro}
            </div>
          )}
        </motion.header>

        <div>{children}</div>
      </div>
    </section>
  )
}
