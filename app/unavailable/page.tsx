import type { Metadata } from 'next'
import { Cursor } from '@/components/Cursor'
import { LineLogo } from '@/components/LineLogo'
import { Staircase } from '@/components/Staircase'
import { ThemeToggle } from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'LINE EVENTS — Připravujeme web',
  description: 'Web LINE EVENTS je momentálně ve výstavbě. Spojte se s námi přes mail nebo telefon.',
  robots: { index: false, follow: false }
}

export default function UnavailablePage() {
  return (
    <>
      <Cursor />
      <main className="relative flex min-h-[100svh] flex-col justify-between px-6 py-10 md:px-10 line-grain">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
          style={{ background: 'var(--halo)', opacity: 'var(--halo-alpha)' }}
        />

        <header className="relative flex items-center justify-between">
          <div className="block w-[140px]">
            <LineLogo variant="auto" size="sm" />
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.32em] text-fg-faint md:inline-flex md:items-center md:gap-2">
              <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Status · 503
            </span>
            <ThemeToggle />
          </div>
        </header>

        <section className="relative mx-auto w-full max-w-[1400px] py-16">
          <p className="mb-8 inline-flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent">
            <span aria-hidden className="h-px w-8 bg-accent" />
            00 / Připravujeme
          </p>

          <Staircase top="WEB" bottom="VE VÝSTAVBĚ." size="xl" />

          <p className="mt-12 max-w-2xl text-[clamp(1.05rem,1.4vw,1.4rem)] font-medium leading-relaxed text-fg/85">
            Pracujeme na finální linii. Web LINE EVENTS bude brzy spuštěn —
            do té doby jsme dostupní mailem nebo telefonem.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <a
              href="mailto:info@lineevents.cz"
              className="group block border-t border-line pt-5 transition-colors hover:border-accent"
            >
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-fg-faint">
                Mail
              </span>
              <span className="mt-3 block font-display text-[clamp(1.3rem,2vw,2rem)] font-black leading-tight transition-colors group-hover:text-accent">
                info@lineevents.cz
              </span>
            </a>
            <a
              href="tel:+420608618253"
              className="group block border-t border-line pt-5 transition-colors hover:border-accent"
            >
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-fg-faint">
                Telefon
              </span>
              <span className="mt-3 block font-display text-[clamp(1.3rem,2vw,2rem)] font-black leading-tight transition-colors group-hover:text-accent">
                608 618 253
              </span>
            </a>
          </div>
        </section>

        <footer className="relative flex flex-col items-start justify-between gap-3 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-fg-faint md:flex-row md:items-center">
          <span>LINE EVENTS s.r.o. · IČO 24057258 · Praha</span>
          <span>Vizuální identita © Emma Folprechtová, 2026</span>
        </footer>
      </main>
    </>
  )
}
