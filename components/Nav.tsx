'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LineLogo } from './LineLogo'

const items = [
  { href: '#o-nas', label: 'O NÁS' },
  { href: '#co-delame', label: 'CO DĚLÁME' },
  { href: '#prostor', label: 'PROSTOR' },
  { href: '#kontakt', label: 'KONTAKT' }
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'backdrop-blur-md bg-line-blue/70 border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10 md:py-6">
        <Link href="#top" className="block" aria-label="LINE EVENTS — domů">
          <LineLogo variant="redOnBlue" size="sm" />
        </Link>

        <nav className="hidden items-center gap-7 text-[0.78rem] font-semibold uppercase tracking-[0.18em] md:flex">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="text-line-white/80 transition-colors hover:text-line-red"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#kontakt"
          className="group relative inline-flex items-center gap-2 rounded-full bg-line-red px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-line-blue transition-transform hover:scale-[1.03]"
        >
          <span>Chci event</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </header>
  )
}
