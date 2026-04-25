'use client'

import { motion } from 'framer-motion'
import { Section, StaircaseHeading } from './Section'

const stats = [
  { value: '20+', label: 'let zkušeností' },
  { value: '∞', label: 'individuální přístup' },
  { value: '0', label: 'šablon' }
]

export function AboutSection() {
  return (
    <Section id="o-nas" eyebrow="LINE / O nás" title={<StaircaseHeading top="ZKUŠENOST," bottom="KTERÁ MÁ PŘESAH." />}>
      <div className="space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-[clamp(1.05rem,1.45vw,1.4rem)] font-medium leading-relaxed text-line-white/85"
        >
          <p>
            Máme za sebou více než 20 let zkušeností z produkce, divadla, filmu, reklam, festivalů a eventů.
            Rozumíme prostoru, emocím i detailu.
          </p>
          <p className="text-line-white">
            Nepracujeme se šablonami.
            <br />
            <span className="text-line-red">Každý projekt má vlastní linii.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
          {stats.map((s) => (
            <div key={s.label} className="bg-line-blue p-6 md:p-8">
              <div className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-none text-line-red">
                {s.value}
              </div>
              <div className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-line-white/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
