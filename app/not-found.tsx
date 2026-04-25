import Link from 'next/link'
import { LineLogo } from '@/components/LineLogo'
import { Staircase } from '@/components/Staircase'

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col justify-between px-6 py-10 md:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[180px]"
        style={{ background: '#ff3427' }}
      />

      <header className="relative flex items-center justify-between">
        <Link href="/" aria-label="LINE EVENTS — domů">
          <LineLogo variant="redOnBlue" size="sm" />
        </Link>
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-line-white/55">
          404
        </span>
      </header>

      <section className="relative mx-auto w-full max-w-[1400px]">
        <p className="mb-6 inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-line-red">
          <span aria-hidden className="h-px w-8 bg-line-red" />
          Mimo linii
        </p>
        <Staircase top="ZTRACENI" bottom="V PROSTORU." size="lg" />
        <p className="mt-10 max-w-xl text-[clamp(1rem,1.4vw,1.3rem)] font-medium leading-snug text-line-white/80">
          Tahle stránka v naší linii není. Vraťte se zpět a pojďme stavět prostor, který bude vidět.
        </p>
        <Link
          href="/"
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-line-red px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-line-blue transition-transform hover:scale-[1.04]"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          <span>Zpět na hlavní</span>
        </Link>
      </section>

      <footer className="relative text-[0.7rem] uppercase tracking-[0.24em] text-line-white/45">
        LINE EVENTS s.r.o. · info@lineevents.cz · 608 618 253
      </footer>
    </main>
  )
}
