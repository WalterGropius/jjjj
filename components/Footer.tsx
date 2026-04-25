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

const officeCol: Link[] = [
  { label: 'LINE EVENTS s.r.o.' },
  { label: 'Na květnici 1113/8' },
  { label: 'Nusle, 140 00 Praha' },
  { label: 'IČO 24057258' }
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 pb-10 pt-20 md:px-10">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <LineLogo variant="redOnBlue" size="md" />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-line-white/65">
            Eventy. Prostor. Zážitek.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
          <FootCol title="Navigace" items={navCol} />
          <FootCol title="Kontakt" items={contactCol} />
          <FootCol title="Sídlo" items={officeCol} />
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-[1600px] flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-[0.7rem] uppercase tracking-[0.24em] text-line-white/50 md:flex-row md:items-center">
        <span>© {new Date().getFullYear()} LINE EVENTS s.r.o. — Všechna práva vyhrazena.</span>
        <span>C 437855/MSPH · Městský soud v Praze · od 11. 12. 2025</span>
      </div>
    </footer>
  )
}

function FootCol({ title, items }: { title: string; items: Link[] }) {
  return (
    <div>
      <h4 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-line-red">{title}</h4>
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
