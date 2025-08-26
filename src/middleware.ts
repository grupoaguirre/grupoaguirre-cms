import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl

    if (pathname.includes('undefined') || pathname.includes('null')) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Ruta problemática detectada: ${pathname}`)
      }
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Middleware error:', error)
    }
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
