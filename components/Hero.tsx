'use client'

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Staircase } from './Staircase'
import { MagneticPill } from './MagneticPill'

const rotating = ['VIDĚT', 'SLYŠET', 'V PAMĚTI']

export function Hero() {
  const [i, setI] = useState(0)
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yShift = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0.55, 1], [1, 0])

  useEffect(() => {
    if (prefersReduced) return
    const t = setInterval(() => setI((v) => (v + 1) % rotating.length), 2800)
    return () => clearInterval(t)
  }, [prefersReduced])

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden line-grain"
    >
      {/* Soft brand halos */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[18%] h-[60vh] w-[60vh] rounded-full blur-[160px]"
        style={{ background: 'var(--halo)', opacity: 'var(--halo-alpha)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-[55vh] w-[55vh] rounded-full blur-[140px]"
        style={{ background: 'var(--halo)', opacity: 'calc(var(--halo-alpha) * 0.7)' }}
      />

      {/* Top meta row — date, location, status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute inset-x-0 top-24 z-10 hidden md:block"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-10 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-fg-faint">
          <span>Praha · CZ — 50.06° N · 14.46° E</span>
          <span className="flex items-center gap-2">
            <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Bookujeme 2026 / 2027
          </span>
        </div>
      </motion.div>

      <motion.div
        style={{ y: yShift, opacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-6 pb-10 pt-32 md:px-10 md:pb-16 md:pt-40"
      >
        <div className="flex flex-1 flex-col justify-center">
          {/* Packshot order from manual page 17: line draws first, then top word, then bottom word.
              The pt on overflow wrappers protects diacritics (Ď, Ě). */}
          <div className="font-display font-black leading-[0.86] tracking-tightest">
            <div className="overflow-hidden pt-[0.18em]">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.55, ease: [0.85, 0, 0.15, 1] }}
                className="block text-[clamp(4rem,15vw,15rem)] text-fg"
              >
                BUĎTE
              </motion.span>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.0, delay: 0.15, ease: [0.85, 0, 0.15, 1] }}
              style={{ transformOrigin: 'left' }}
              className="my-2 h-[0.06em] w-full bg-accent text-[clamp(4rem,15vw,15rem)] md:my-3"
            />

            <div className="flex justify-end pr-[0.04em]">
              <div className="relative overflow-hidden pt-[0.18em] text-[clamp(4rem,15vw,15rem)] leading-[1]">
                {/* Invisible spacer sized to the widest rotating word — keeps the slot stable */}
                <span aria-hidden className="invisible block whitespace-nowrap">V&nbsp;PAMĚTI</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotating[i]}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-110%' }}
                    transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
                    className="absolute right-0 top-[0.18em] block whitespace-nowrap text-accent"
                  >
                    {rotating[i]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-fg-faint md:mt-14"
          >
            {['Buďte vidět', 'Buďte slyšet', 'Buďte v paměti'].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span aria-hidden className="block h-px w-6 bg-accent" />
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-2xl text-[clamp(1rem,1.4vw,1.35rem)] font-medium leading-snug text-fg/85">
              Prostory a eventy, které dávají značkám jasnou linii, směr a skutečný výsledek.
            </p>
            <MagneticPill href="#kontakt">
              <span>Chci event</span>
              <span aria-hidden>→</span>
            </MagneticPill>
          </motion.div>
        </div>

        <ProcessLine />
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <span className="block h-10 w-px overflow-hidden bg-line">
          <motion.span
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-full w-full bg-accent"
          />
        </span>
      </motion.div>
    </section>
  )
}

const steps = ['Strategie', 'Kreativita', 'Realizace', 'Výsledek']

function ProcessLine() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.8 }}
      className="mt-16 select-none"
    >
      <p className="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-fg-faint">
        Naše linie / Process 01—04
      </p>
      <div className="relative">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
          style={{ transformOrigin: 'left' }}
          className="absolute left-0 right-0 top-1/2 h-px bg-line-strong"
        />
        <ol className="relative flex flex-wrap items-center justify-between gap-y-4">
          {steps.map((s, idx) => (
            <li
              key={s}
              className="relative flex items-center gap-3 bg-bg pr-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-fg/85 md:text-[0.85rem]"
            >
              <span className="flex h-2 w-2 rounded-full bg-accent" aria-hidden />
              {s}
              {idx < steps.length - 1 && (
                <span aria-hidden className="ml-3 text-accent">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  )
}
