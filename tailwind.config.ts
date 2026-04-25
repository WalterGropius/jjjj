import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        line: {
          red: '#ff3427',
          blue: '#240f5a',
          white: '#ffffff'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      letterSpacing: {
        tightest: '-0.04em'
      }
    }
  },
  plugins: []
}

export default config
