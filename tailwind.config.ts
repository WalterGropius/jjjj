import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-elev': 'var(--bg-elev)',
        fg: 'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
        'fg-faint': 'var(--fg-faint)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        rule: 'var(--rule)',
        paper: 'var(--paper)',
        // Brand absolute (kept for cases where a token shouldn't flip)
        'line-red': '#ff3427',
        'line-blue': '#240f5a',
        'line-white': '#ffffff'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      letterSpacing: {
        tightest: '-0.04em'
      },
      transitionTimingFunction: {
        line: 'cubic-bezier(0.85, 0, 0.15, 1)'
      }
    }
  },
  plugins: []
}

export default config
