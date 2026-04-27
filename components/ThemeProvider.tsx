'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export type Theme = 'light' | 'dark'
type Mode = Theme | 'system'

type Ctx = {
  theme: Theme
  mode: Mode
  setMode: (m: Mode) => void
  toggle: () => void
}

const ThemeContext = createContext<Ctx | null>(null)

const STORAGE_KEY = 'line-events-theme'

function systemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function readMode(): Mode {
  if (typeof window === 'undefined') return 'system'
  const v = window.localStorage.getItem(STORAGE_KEY)
  return v === 'light' || v === 'dark' ? v : 'system'
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>('system')
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const m = readMode()
    setModeState(m)
    const t = m === 'system' ? systemTheme() : m
    setTheme(t)
    apply(t)
  }, [])

  // Follow system changes when mode === 'system'
  useEffect(() => {
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      const t: Theme = mq.matches ? 'light' : 'dark'
      setTheme(t)
      apply(t)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [mode])

  const setMode = useCallback((m: Mode) => {
    setModeState(m)
    if (m === 'system') {
      window.localStorage.removeItem(STORAGE_KEY)
      const t = systemTheme()
      setTheme(t)
      apply(t)
    } else {
      window.localStorage.setItem(STORAGE_KEY, m)
      setTheme(m)
      apply(m)
    }
  }, [])

  const toggle = useCallback(() => {
    setMode(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setMode])

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, toggle }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

/**
 * No-flash inline script. Runs BEFORE React hydrates and sets data-theme so
 * the very first paint matches the user's preference / system setting.
 */
export const NoFlashScript = `(function(){try{var s=localStorage.getItem('${STORAGE_KEY}');var m=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=(s==='light'||s==='dark')?s:m;}catch(e){document.documentElement.dataset.theme='dark';}})();`
