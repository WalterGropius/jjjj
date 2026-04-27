import Link from 'next/link'
import { LineLogo } from '@/components/LineLogo'
import { Staircase } from '@/components/Staircase'

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col justify-between px-6 py-10 md:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
        style={{ background: 'var(--halo)', opacity: 'var(--halo-alpha)' }}
      />

      <header className="relative flex items-center justify-between">
        <Link href="/" className="block w-[140px]" aria-label="LINE EVENTS — domů">
          <LineLogo variant="auto" size="sm" />
        </Link>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-fg-faint">
          Error · 404
        </span>
      </header>

      <section className="relative mx-auto w-full max-w-[1400px]">
        <p className="mb-6 inline-flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent">
          <span aria-hidden className="h-px w-8 bg-accent" />
          Mimo linii
        </p>
        <Staircase top="ZTRACENI" bottom="V PROSTORU." size="lg" />
        <p className="mt-10 max-w-xl text-[clamp(1rem,1.4vw,1.3rem)] font-medium leading-snug text-fg/80">
          Tahle stránka v naší linii není. Vraťte se zpět a pojďme stavět prostor, který bude vidět.
        </p>
        <Link href="/" className="pill mt-12 inline-flex">
          <span aria-hidden>←</span>
          <span>Zpět na hlavní</span>
        </Link>
      </section>

      <footer className="relative font-mono text-[0.6rem] uppercase tracking-[0.24em] text-fg-faint">
        LINE EVENTS s.r.o. · info@lineevents.cz · 608 618 253
      </footer>
    </main>
  )
}
