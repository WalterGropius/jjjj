'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? 'Přepnout na tmavý režim' : 'Přepnout na světlý režim'}
      className={`group relative inline-flex h-9 w-[68px] items-center rounded-full border border-line bg-paper px-1 transition-colors hover:border-accent/60 ${className}`}
    >
      <span aria-hidden className="absolute left-3 text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-fg-faint">
        D
      </span>
      <span aria-hidden className="absolute right-3 text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-fg-faint">
        L
      </span>
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 600, damping: 38 }}
        className={`relative z-10 block h-7 w-7 rounded-full bg-accent ${isLight ? 'ml-auto' : ''}`}
      />
    </button>
  )
}
