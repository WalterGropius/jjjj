'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'

const items = [
  {
    no: '01',
    title: 'Strategie',
    lead: 'Rozumíme cíli, značce i kontextu.',
    body:
      'Klíčové je pro nás vnímání vaší značky. Chceme pochopit vaši DNA. Kdo jste a kam směřujete.'
  },
  {
    no: '02',
    title: 'Kreativita',
    lead: 'Tvoříme řešení, které má smysl – ne jen efekt.',
    body:
      'Každý projekt drží linii od myšlenky po finální výsledek. Výsledkem je zážitek, který je autentický a uvěřitelný.'
  },
  {
    no: '03',
    title: 'Důvěra',
    lead: 'Budujeme vztah, na kterém projekt stojí.',
    body:
      'Pracujeme s kontextem značky, prostorem i publikem. Režírujeme pozornost tak, aby hlavní sdělení vaší značky zaznělo v ten pravý moment.'
  },
  {
    no: '04',
    title: 'Výsledek',
    lead: 'Event, který zanechá stopu.',
    body:
      'Vytváříme atmosféru, kde vaše značka obstojí. Skvělý event je ten, kde se lidé cítí přirozeně a přesto výjimečně. Je to prostor, kde se rodí vztahy.'
  }
]

export function ServicesSection() {
  return (
    <Section
      id="co-delame"
      number="02"
      eyebrow="LINE / Co děláme"
      headline={{ top: 'EVENT JAKO', bottom: 'NÁSTROJ ZNAČKY.' }}
    >
      <ul className="divide-y divide-line border-y border-line">
        {items.map((it, i) => (
          <ServiceRow key={it.no} {...it} index={i} />
        ))}
      </ul>
    </Section>
  )
}

type RowProps = { no: string; title: string; lead: string; body: string; index: number }

function ServiceRow({ no, title, lead, body, index }: RowProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group relative grid grid-cols-12 items-baseline gap-4 py-8 md:py-10"
    >
      <span className="col-span-2 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-accent md:col-span-1">
        {no}
      </span>
      <h3 className="col-span-10 font-display text-[clamp(1.8rem,3.4vw,3rem)] font-black uppercase leading-[0.95] tracking-tightest text-fg transition-transform duration-500 ease-line group-hover:translate-x-2 md:col-span-4">
        {title}
      </h3>
      <div className="col-span-12 md:col-span-7">
        <p className="text-[clamp(1rem,1.3vw,1.25rem)] font-semibold leading-snug text-fg">
          {lead}
        </p>
        <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-fg/65">{body}</p>
      </div>

      {/* Hover line: draws from left under the row */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-px left-0 h-px w-0 origin-left bg-accent transition-all duration-700 ease-line group-hover:w-full"
      />
    </motion.li>
  )
}
