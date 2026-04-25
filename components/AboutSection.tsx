'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'

const stats = [
  { value: '20+', label: 'let zkušeností' },
  { value: '∞', label: 'individuální přístup' },
  { value: '0', label: 'šablon' }
]

export function AboutSection() {
  return (
    <Section
      id="o-nas"
      eyebrow="LINE / O nás"
      headline={{ top: 'ZKUŠENOST,', bottom: 'KTERÁ MÁ PŘESAH.' }}
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-[clamp(1.05rem,1.45vw,1.4rem)] font-medium leading-relaxed text-line-white/85 md:col-span-7"
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

        <div className="grid grid-cols-3 gap-px self-end overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:col-span-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-line-blue p-5 md:p-6">
              <div className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-black leading-none text-line-red">
                {s.value}
              </div>
              <div className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-line-white/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
