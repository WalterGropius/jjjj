'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineLogo } from './LineLogo'

type Link = { href?: string; label: string }

const navCol: Link[] = [
  { href: '#o-nas', label: 'O nás' },
  { href: '#co-delame', label: 'Co děláme' },
  { href: '#prostor', label: 'Prostor & modularita' },
  { href: '#kontakt', label: 'Kontakt' }
]

const contactCol: Link[] = [
  { href: 'mailto:info@lineevents.cz', label: 'info@lineevents.cz' },
  { href: 'tel:+420608618253', label: '608 618 253' }
]

const registry = [
  { label: 'Obchodní firma', value: 'LINE EVENTS s.r.o.' },
  { label: 'Datum vzniku a zápisu', value: '11. prosinec 2025' },
  { label: 'Spisová značka', value: 'C 437855/MSPH — Městský soud v Praze' },
  { label: 'Identifikační číslo', value: '24057258' },
  { label: 'Sídlo', value: 'Na květnici 1113/8\nNusle, 140 00 Praha', wide: true },
  { label: 'Zdroj', value: 'Obchodní rejstřík — aktuální výpis', wide: true }
]

export function Footer() {
  const [open, setOpen] = useState(false)

  return (
    <footer className="relative border-t border-line px-6 pb-10 pt-20 md:px-10">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="inline-block w-[160px]">
            <LineLogo variant="auto" size="sm" />
          </div>
          <p className="mt-8 max-w-sm font-display text-[clamp(1.1rem,1.4vw,1.4rem)] font-black uppercase tracking-tightest text-fg">
            Eventy. Prostor. Zážitek.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-2">
          <FootCol title="Navigace" items={navCol} />
          <FootCol title="Kontakt" items={contactCol} />
        </div>
      </div>

      {/* Collapsed by default — full obchodní rejstřík expands on demand */}
      <div className="mx-auto mt-16 max-w-[1600px] border-t border-line pt-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="registry-block"
          className="group inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-fg-faint transition-colors hover:text-accent"
        >
          <span aria-hidden className="block h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
          <span>{open ? 'Skrýt info' : 'Více info — obchodní rejstřík'}</span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.85, 0, 0.15, 1] }}
            className="inline-block translate-y-px text-fg-faint group-hover:text-accent"
          >
            ▾
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="registry-block"
              key="registry"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.85, 0, 0.15, 1] }}
              className="overflow-hidden"
            >
              <dl className="mt-8 grid gap-8 md:grid-cols-4">
                {registry.map((r) => (
                  <div key={r.label} className={r.wide ? 'md:col-span-2' : ''}>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-fg-faint">
                      {r.label}
                    </dt>
                    <dd className="mt-2 whitespace-pre-line text-[0.95rem] leading-snug text-fg/85">
                      {r.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1600px] flex-col items-start justify-between gap-4 border-t border-line pt-6 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-fg-faint md:flex-row md:items-center">
        <span>© {new Date().getFullYear()} LINE EVENTS s.r.o. — Všechna práva vyhrazena.</span>
        <span>Web: vizuální identita © Emma Folprechtová, 2026</span>
      </div>
    </footer>
  )
}

function FootCol({ title, items }: { title: string; items: Link[] }) {
  return (
    <div>
      <h4 className="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-accent">
        {title}
      </h4>
      <ul className="flex flex-col gap-2 text-[0.95rem] text-fg/80">
        {items.map((it, i) => (
          <li key={i}>
            {it.href ? (
              <a href={it.href} className="transition-colors hover:text-accent">
                {it.label}
              </a>
            ) : (
              <span>{it.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
