'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Staircase } from './Staircase'

type Props = {
  id: string
  eyebrow: string
  /** Two-word headline rendered with brand staircase rule. */
  headline: { top: string; bottom: string }
  intro?: ReactNode
  children?: ReactNode
  className?: string
  /** Override staircase size if needed for tight pairs. */
  headlineSize?: 'md' | 'lg' | 'xl'
}

export function Section({
  id,
  eyebrow,
  headline,
  intro,
  children,
  className = '',
  headlineSize = 'lg'
}: Props) {
  return (
    <section id={id} className={`relative scroll-mt-24 px-6 py-24 md:px-10 md:py-36 ${className}`}>
      <div className="mx-auto max-w-[1600px]">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="mb-6 inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-line-red">
            <span aria-hidden className="h-px w-8 bg-line-red" />
            {eyebrow}
          </p>
          <Staircase top={headline.top} bottom={headline.bottom} size={headlineSize} />
          {intro && (
            <div className="mt-10 max-w-2xl text-[clamp(1rem,1.4vw,1.3rem)] font-medium leading-relaxed text-line-white/85">
              {intro}
            </div>
          )}
        </motion.header>

        <div>{children}</div>
      </div>
    </section>
  )
}
