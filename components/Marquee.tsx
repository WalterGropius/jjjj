'use client'

const items = ['BUĎTE VIDĚT', 'BUĎTE SLYŠET', 'BUĎTE V PAMĚTI']

export function Marquee() {
  const row = [...items, ...items, ...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-line-blue/20 bg-line-red py-6">
      <div className="line-marquee-track flex w-max items-center gap-12 whitespace-nowrap">
        {row.concat(row).map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-display text-[clamp(2rem,4vw,4rem)] font-black uppercase tracking-tightest text-line-blue"
          >
            {t}
            <span aria-hidden className="inline-block h-[0.55em] w-[0.55em] rounded-full bg-line-blue" />
          </span>
        ))}
      </div>
    </div>
  )
}
