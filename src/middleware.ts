import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const STATIC_REDIRECTS: Record<string, string> = {
  '/shop': '/boutique',
  '/catalogue': '/boutique',
  '/journal': '/edit',
  '/products': '/boutique',
  '/contact-us': '/contact',
  '/about-us': '/about',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const target = STATIC_REDIRECTS[pathname.toLowerCase()];
  if (target) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - brand (static brand assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|brand).*)',
  ],
};
