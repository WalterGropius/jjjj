import type { Metadata, Viewport } from 'next'
import { Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { NoFlashScript, ThemeProvider } from '@/components/ThemeProvider'

const display = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap'
})

const mono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono',
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#240f5a' }
  ],
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${display.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NoFlashScript }} />
      </head>
      <body className="bg-bg text-fg font-display">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
