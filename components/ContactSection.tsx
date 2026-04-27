'use client'

import { motion } from 'framer-motion'
import { Staircase } from './Staircase'
import { MagneticPill } from './MagneticPill'

export function ContactSection() {
  return (
    <section
      id="kontakt"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:px-10 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
        style={{ background: 'var(--halo)', opacity: 'calc(var(--halo-alpha) * 0.7)' }}
      />

      <div className="relative mx-auto max-w-[1600px]">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
          style={{ transformOrigin: 'left' }}
          className="mb-10 h-px w-full bg-line-strong"
        />

        <div className="mb-14 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-fg-faint">
          <span className="flex items-center gap-3">
            <span className="text-accent">04</span>
            <span aria-hidden className="block h-px w-8 bg-accent" />
            LINE / Kontakt
          </span>
          <span className="hidden md:inline">info@lineevents.cz · 608 618 253</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Staircase top="CHCETE" bottom="BÝT VIDĚT?" size="lg" />
        </motion.div>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <MagneticPill href="mailto:info@lineevents.cz">
              <span>Kontaktujte nás</span>
              <span aria-hidden>→</span>
            </MagneticPill>
          </div>

          <dl className="md:col-span-6 md:grid md:grid-cols-2 md:gap-10">
            <div className="border-t border-line pt-5">
              <dt className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-fg-faint">Mail</dt>
              <dd className="mt-3 font-display text-[clamp(1.3rem,2vw,2rem)] font-black leading-tight">
                <a className="transition-colors hover:text-accent" href="mailto:info@lineevents.cz">
                  info@lineevents.cz
                </a>
              </dd>
            </div>
            <div className="mt-10 border-t border-line pt-5 md:mt-0">
              <dt className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-fg-faint">Telefon</dt>
              <dd className="mt-3 font-display text-[clamp(1.3rem,2vw,2rem)] font-black leading-tight">
                <a className="transition-colors hover:text-accent" href="tel:+420608618253">
                  608 618 253
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* Geo / location strip */}
        <div className="mt-16 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
          <div>
            <dt className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-fg-faint">Lokace</dt>
            <dd className="mt-2 font-mono text-[0.78rem] uppercase tracking-[0.24em] text-fg/85">
              Praha · Česko
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-fg-faint">Souřadnice</dt>
            <dd className="mt-2 font-mono text-[0.78rem] uppercase tracking-[0.24em] text-fg/85">
              50.06° N · 14.46° E
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-fg-faint">Stav</dt>
            <dd className="mt-2 inline-flex items-center gap-2 font-mono text-[0.78rem] uppercase tracking-[0.24em] text-fg/85">
              <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Bookujeme 2026 / 2027
            </dd>
          </div>
        </div>
      </div>
    </section>
  )
}
