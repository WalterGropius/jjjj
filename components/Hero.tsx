'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const rotating = ['VIDĚT', 'SLYŠET', 'V PAMĚTI']

export function Hero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % rotating.length), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden line-grain">
      {/* Soft red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[20%] h-[60vh] w-[60vh] rounded-full opacity-40 blur-[160px]"
        style={{ background: '#ff3427' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-[55vh] w-[55vh] rounded-full opacity-30 blur-[140px]"
        style={{ background: '#ff3427' }}
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-6 pb-10 pt-32 md:px-10 md:pb-16 md:pt-40">
        {/* Headline */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="font-display font-black leading-[0.86] tracking-tightest">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
              className="inline-block overflow-hidden"
            >
              <span className="block text-[clamp(4rem,15vw,15rem)] text-line-white">BUĎTE</span>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.05, delay: 0.4, ease: [0.85, 0, 0.15, 1] }}
              style={{ transformOrigin: 'left' }}
              className="my-2 h-[0.06em] w-full bg-line-red text-[clamp(4rem,15vw,15rem)] md:my-3"
            />

            <div className="flex justify-end pr-[0.04em]">
              <div className="relative h-[0.95em] text-[clamp(4rem,15vw,15rem)] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotating[i]}
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-105%' }}
                    transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
                    className="block text-line-red"
                  >
                    {rotating[i]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Podclaim + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-12 flex flex-col items-start gap-8 md:mt-16 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-2xl text-[clamp(1rem,1.4vw,1.35rem)] font-medium leading-snug text-line-white/85">
              Prostory a eventy, které dávají značkám jasnou linii, směr a skutečný výsledek.
            </p>
            <a
              href="#kontakt"
              className="group relative inline-flex items-center gap-3 rounded-full bg-line-red px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-line-blue transition-transform hover:scale-[1.04]"
            >
              <span>Chci event</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>

        {/* Process line */}
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
      transition={{ duration: 1, delay: 1.4 }}
      className="mt-16 select-none"
    >
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
            <li key={s} className="relative flex items-center gap-3 bg-line-blue pr-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-line-white/80 first:pl-0 md:text-[0.85rem]">
              <span className="flex h-2 w-2 rounded-full bg-line-red" aria-hidden />
              {s}
              {idx < steps.length - 1 && <span aria-hidden className="ml-3 text-line-red">→</span>}
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  )
}
