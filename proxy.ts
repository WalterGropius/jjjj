import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * While we polish the launch, redirect every request to /unavailable.
 * Static assets and Next.js internals are excluded via the matcher below
 * so the unavailable page itself can load fonts, CSS, and the favicon.
 *
 * Flip MAINTENANCE_MODE back to true to take the site offline again,
 * or remove this file (or its export) to bring the rest of the site back.
 */
const MAINTENANCE_MODE = false

export function proxy(req: NextRequest) {
  if (!MAINTENANCE_MODE) return NextResponse.next()

  const { pathname } = req.nextUrl
  if (pathname === '/unavailable') return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = '/unavailable'
  url.search = ''
  return NextResponse.redirect(url, 307)
}

export const config = {
  // Match every path EXCEPT Next.js internals, the dynamic icon route,
  // and any file with an extension (favicons, OG images, etc.).
  matcher: ['/((?!_next/|icon|.*\\..*).*)']
}
