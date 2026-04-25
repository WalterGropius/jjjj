'use client'

import { motion } from 'framer-motion'
import { Section, StaircaseHeading } from './Section'

const pillars = [
  {
    label: 'Variabilita',
    body:
      'Umíme reagovat rychle a přesně. Navrhneme jednoduché řešení i komplexní zázemí na míru konkrétnímu prostoru. Vždy s důrazem na čistotu, funkčnost a kvalitní provedení.'
  },
  {
    label: 'Architektura',
    body:
      'Prostor stavíme s jasným záměrem. Každý prvek má své místo, každá zóna svůj význam. Výsledkem je celek, který dává smysl vizuálně i funkčně.'
  },
  {
    label: 'Kontext',
    body:
      'Vnímáme prostor v souvislostech. Zkušenosti z filmu a divadla nám dávají cit pro detail a rytmus. Modulární prvky propojujeme do jednoho přirozeně fungujícího celku.'
  },
  {
    label: 'Atmosféra',
    body:
      'Tvoříme prostředí, které přitahuje pozornost. Značka v něm působí přirozeně, silně a zapamatovatelně.'
  }
]

export function SpaceSection() {
  return (
    <Section id="prostor" eyebrow="LINE / Prostor & modularita" title={<StaircaseHeading top="PROSTOR" bottom="BEZ LIMITŮ." />}>
      <p className="mb-12 max-w-2xl text-[clamp(1.05rem,1.4vw,1.35rem)] font-medium leading-relaxed text-line-white/85">
        Pomocí modulárních systémů budujeme funkční, vizuálně čisté a prémiové prostředí, které se plně přizpůsobí
        vaší vizi.
      </p>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
        {pillars.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group relative overflow-hidden bg-line-blue p-8 md:p-10"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-line-red transition-all duration-500 group-hover:w-20" aria-hidden />
              <h3 className="font-display text-[clamp(1.3rem,1.8vw,1.7rem)] font-black uppercase tracking-tightest text-line-white">
                {p.label}
              </h3>
            </div>
            <p className="text-[0.98rem] leading-relaxed text-line-white/70">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
