import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unavailable',
  description: 'This page is currently unavailable.',
  robots: { index: false, follow: false }
}

const styles = {
  page: {
    position: 'fixed' as const,
    inset: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: '#ffffff',
    color: '#111111',
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    letterSpacing: '-0.01em'
  },
  rule: {
    width: 64,
    height: 1,
    background: '#111111',
    marginBottom: 28,
    opacity: 0.45
  },
  status: {
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
    fontSize: 11,
    letterSpacing: '0.24em',
    textTransform: 'uppercase' as const,
    opacity: 0.5,
    marginBottom: 18
  },
  heading: {
    margin: 0,
    fontSize: 'clamp(2rem, 5vw, 3.25rem)',
    fontWeight: 600,
    lineHeight: 1.05
  },
  body: {
    margin: '20px 0 0',
    maxWidth: 420,
    fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
    lineHeight: 1.55,
    textAlign: 'center' as const,
    opacity: 0.7
  }
}

export default function UnavailablePage() {
  return (
    <div style={styles.page}>
      <div style={styles.status}>503 · Service Unavailable</div>
      <div style={styles.rule} />
      <h1 style={styles.heading}>This page is currently unavailable.</h1>
      <p style={styles.body}>Please check back soon.</p>
    </div>
  )
}
