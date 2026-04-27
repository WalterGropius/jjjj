'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LineLogo } from './LineLogo'
import { ThemeToggle } from './ThemeToggle'
import { MagneticPill } from './MagneticPill'

const items = [
  { href: '#o-nas', label: 'O nás', no: '01' },
  { href: '#co-delame', label: 'Co děláme', no: '02' },
  { href: '#prostor', label: 'Prostor', no: '03' },
  { href: '#kontakt', label: 'Kontakt', no: '04' }
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'backdrop-blur-md bg-bg/72 border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10 md:py-5">
        <Link href="#top" className="block w-[140px]" aria-label="LINE EVENTS — domů">
          <LineLogo variant="auto" size="sm" />
        </Link>

        <nav className="hidden items-center gap-8 text-[0.72rem] font-semibold uppercase tracking-[0.22em] md:flex">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="group relative inline-flex items-center gap-2 text-fg/85 transition-colors hover:text-accent"
            >
              <span className="font-mono text-[0.62rem] text-fg-faint group-hover:text-accent">{it.no}</span>
              <span className="relative">
                {it.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-500 ease-line group-hover:w-full"
                />
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <MagneticPill href="#kontakt">
            <span>Chci event</span>
            <span aria-hidden>→</span>
          </MagneticPill>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
            aria-expanded={open}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper"
          >
            <span
              aria-hidden
              className={`absolute h-px w-5 bg-fg transition-transform ${open ? 'translate-y-0 rotate-45' : '-translate-y-1.5'}`}
            />
            <span
              aria-hidden
              className={`absolute h-px w-5 bg-fg transition-transform ${open ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 top-[64px] z-40 origin-top overflow-hidden border-b border-line bg-bg transition-[max-height,opacity] duration-500 md:hidden ${
          open ? 'max-h-[80vh] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col divide-y divide-line">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between px-6 py-6"
              >
                <span className="font-mono text-[0.7rem] text-fg-faint">{it.no}</span>
                <span className="font-display text-[clamp(1.6rem,7vw,2.4rem)] font-black uppercase tracking-tightest text-fg">
                  {it.label}
                </span>
              </Link>
            </li>
          ))}
          <li className="px-6 py-6">
            <MagneticPill href="#kontakt">
              <span>Chci event</span>
              <span aria-hidden>→</span>
            </MagneticPill>
          </li>
        </ul>
      </div>
    </header>
  )
}
