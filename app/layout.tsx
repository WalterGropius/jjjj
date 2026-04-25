import type { Metadata, Viewport } from 'next'
import { Inter_Tight } from 'next/font/google'
import './globals.css'

const display = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'LINE EVENTS — Buďte vidět',
  description:
    'Prostory a eventy, které dávají značkám jasnou linii, směr a skutečný výsledek. Strategie · Kreativita · Realizace · Výsledek.',
  metadataBase: new URL('https://lineevents.cz'),
  openGraph: {
    title: 'LINE EVENTS — Buďte vidět',
    description:
      'Eventy. Prostor. Zážitek. Více než 20 let zkušeností z produkce, divadla, filmu, reklam, festivalů a eventů.',
    locale: 'cs_CZ',
    type: 'website'
  }
}

export const viewport: Viewport = {
  themeColor: '#240f5a',
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={display.variable}>
      <body className="bg-line-blue text-line-white font-display">{children}</body>
    </html>
  )
}
