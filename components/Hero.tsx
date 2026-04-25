'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const rotating = ['VIDĚT', 'SLYŠET', 'V PAMĚTI']

export function Hero() {
  const [i, setI] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const t = setInterval(() => setI((v) => (v + 1) % rotating.length), 2600)
    return () => clearInterval(t)
  }, [prefersReduced])

  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden line-grain">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[18%] h-[60vh] w-[60vh] rounded-full opacity-40 blur-[160px]"
        style={{ background: '#ff3427' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-[55vh] w-[55vh] rounded-full opacity-30 blur-[140px]"
        style={{ background: '#ff3427' }}
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-6 pb-10 pt-32 md:px-10 md:pb-16 md:pt-40">
        <div className="flex flex-1 flex-col justify-center">
          {/* Packshot order from manual page 17: line draws first, then LINE word, then EVENTS word.
              Each word slot uses overflow:hidden for the slide-in animation; the inner span
              has padding-top so diacritics (Ď, Ě, Š) stay inside the visible area. */}
          <div className="font-display font-black leading-[0.86] tracking-tightest">
            <div className="overflow-hidden pt-[0.18em]">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.55, ease: [0.85, 0, 0.15, 1] }}
                className="block text-[clamp(4rem,15vw,15rem)] text-line-white"
              >
                BUĎTE
              </motion.span>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.0, delay: 0.15, ease: [0.85, 0, 0.15, 1] }}
              style={{ transformOrigin: 'left' }}
              className="my-2 h-[0.06em] w-full bg-line-red text-[clamp(4rem,15vw,15rem)] md:my-3"
            />

            <div className="flex justify-end pr-[0.04em]">
              <div className="relative overflow-hidden pt-[0.18em] text-[clamp(4rem,15vw,15rem)]">
                <div className="relative h-[0.95em]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotating[i]}
                      initial={{ y: '105%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '-105%' }}
                      transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
                      className="absolute inset-0 block text-line-red"
                    >
                      {rotating[i]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-claim trio — every line of the brief verbatim */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-line-white/55 md:mt-14"
          >
            {['Buďte vidět', 'Buďte slyšet', 'Buďte v paměti'].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span aria-hidden className="block h-px w-6 bg-line-red" />
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
            <p className="max-w-2xl text-[clamp(1rem,1.4vw,1.35rem)] font-medium leading-snug text-line-white/85">
              Prostory a eventy, které dávají značkám jasnou linii, směr a skutečný výsledek.
            </p>
            <a
              href="#kontakt"
              className="group relative inline-flex items-center gap-3 rounded-full bg-line-red px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-line-blue transition-transform hover:scale-[1.04]"
            >
              <span>Chci event</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>

        <ProcessLine />
      </div>
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
      <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-line-white/45">
        Naše linie
      </p>
      <div className="relative">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
          style={{ transformOrigin: 'left' }}
          className="absolute left-0 right-0 top-1/2 h-px bg-line-white/30"
        />
        <ol className="relative flex flex-wrap items-center justify-between gap-y-4">
          {steps.map((s, idx) => (
            <li
              key={s}
              className="relative flex items-center gap-3 bg-line-blue pr-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-line-white/85 md:text-[0.85rem]"
            >
              <span className="flex h-2 w-2 rounded-full bg-line-red" aria-hidden />
              {s}
              {idx < steps.length - 1 && (
                <span aria-hidden className="ml-3 text-line-red">
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
