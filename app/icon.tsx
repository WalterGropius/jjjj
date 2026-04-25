import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#240f5a',
          color: '#ff3427',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          fontWeight: 900,
          fontSize: 11,
          letterSpacing: '-0.04em',
          padding: '4px 4px'
        }}
      >
        <span style={{ alignSelf: 'flex-start', lineHeight: 1 }}>LINE</span>
        <div style={{ height: 2, background: '#ff3427', margin: '2px 0' }} />
        <span style={{ alignSelf: 'flex-end', lineHeight: 1, fontSize: 8 }}>EVENTS</span>
      </div>
    ),
    size
  )
}
