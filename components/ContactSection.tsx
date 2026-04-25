'use client'

import { motion } from 'framer-motion'
import { Staircase } from './Staircase'

export function ContactSection() {
  return (
    <section
      id="kontakt"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:px-10 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[180px]"
        style={{ background: '#ff3427' }}
      />

      <div className="relative mx-auto max-w-[1600px]">
        <p className="mb-8 inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-line-red">
          <span aria-hidden className="h-px w-8 bg-line-red" />
          LINE / Kontakt
        </p>

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
            <a
              href="mailto:info@lineevents.cz"
              className="group inline-flex items-center gap-4 rounded-full bg-line-red px-10 py-5 text-sm font-bold uppercase tracking-[0.24em] text-line-blue transition-transform hover:scale-[1.04]"
            >
              <span>Kontaktujte nás</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          <dl className="md:col-span-6 md:grid md:grid-cols-2 md:gap-10">
            <div className="border-t border-white/15 pt-5">
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-line-white/55">
                Mail
              </dt>
              <dd className="mt-3 font-display text-[clamp(1.3rem,2vw,2rem)] font-black leading-tight">
                <a className="hover:text-line-red" href="mailto:info@lineevents.cz">
                  info@lineevents.cz
                </a>
              </dd>
            </div>
            <div className="mt-10 border-t border-white/15 pt-5 md:mt-0">
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-line-white/55">
                Telefon
              </dt>
              <dd className="mt-3 font-display text-[clamp(1.3rem,2vw,2rem)] font-black leading-tight">
                <a className="hover:text-line-red" href="tel:+420608618253">
                  608 618 253
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
