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
      number="01"
      eyebrow="LINE / O nás"
      headline={{ top: 'ZKUŠENOST,', bottom: 'KTERÁ MÁ PŘESAH.' }}
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-[clamp(1.05rem,1.45vw,1.4rem)] font-medium leading-relaxed text-fg/85 md:col-span-7"
        >
          <p>
            Máme za sebou více než 20 let zkušeností z produkce, divadla, filmu, reklam, festivalů a eventů.
            Rozumíme prostoru, emocím i detailu.
          </p>
          <p className="text-fg">
            Nepracujeme se šablonami.
            <br />
            <span className="text-accent">Každý projekt má vlastní linii.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-px self-end overflow-hidden rounded-2xl border border-line bg-line md:col-span-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-bg p-5 md:p-6"
            >
              <div className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-black leading-none text-accent">
                {s.value}
              </div>
              <div className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-fg-faint">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
