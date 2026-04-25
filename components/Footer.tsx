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

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 pb-10 pt-20 md:px-10">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="inline-block w-[160px]">
            <LineLogo variant="redOnBlue" size="sm" />
          </div>
          <p className="mt-8 max-w-sm font-display text-[clamp(1.1rem,1.4vw,1.4rem)] font-black uppercase tracking-tightest text-line-white">
            Eventy. Prostor. Zážitek.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-2">
          <FootCol title="Navigace" items={navCol} />
          <FootCol title="Kontakt" items={contactCol} />
        </div>
      </div>

      {/* Obchodní rejstřík — verbatim from email */}
      <div className="mx-auto mt-16 grid max-w-[1600px] gap-8 border-t border-white/10 pt-8 md:grid-cols-4">
        <RegistryCell label="Obchodní firma" value="LINE EVENTS s.r.o." />
        <RegistryCell label="Datum vzniku a zápisu" value="11. prosinec 2025" />
        <RegistryCell label="Spisová značka" value="C 437855/MSPH — Městský soud v Praze" />
        <RegistryCell label="Identifikační číslo" value="24057258" />
        <RegistryCell label="Sídlo" value={'Na květnici 1113/8\nNusle, 140 00 Praha'} className="md:col-span-2" />
        <RegistryCell label="Zdroj" value="Obchodní rejstřík — aktuální výpis" className="md:col-span-2" />
      </div>

      <div className="mx-auto mt-12 flex max-w-[1600px] flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-[0.7rem] uppercase tracking-[0.24em] text-line-white/50 md:flex-row md:items-center">
        <span>© {new Date().getFullYear()} LINE EVENTS s.r.o. — Všechna práva vyhrazena.</span>
        <span>Web: vizuální identita © Emma Folprechtová, 2026</span>
      </div>
    </footer>
  )
}

function RegistryCell({
  label,
  value,
  className = ''
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={className}>
      <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-line-white/45">
        {label}
      </dt>
      <dd className="mt-2 whitespace-pre-line text-[0.95rem] leading-snug text-line-white/85">
        {value}
      </dd>
    </div>
  )
}

function FootCol({ title, items }: { title: string; items: Link[] }) {
  return (
    <div>
      <h4 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-line-red">
        {title}
      </h4>
      <ul className="flex flex-col gap-2 text-[0.95rem] text-line-white/80">
        {items.map((it, i) => (
          <li key={i}>
            {it.href ? (
              <a href={it.href} className="transition-colors hover:text-line-red">
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
