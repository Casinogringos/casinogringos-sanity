import { get } from '@vercel/edge-config'
import { NextRequest, NextResponse } from 'next/server'

const removeFirstSlash = (path: string) => {
    return path.replace(/^\//, '')
}

export async function middleware(request: NextRequest) {
    const redirects = (await get('redirects')) as Record<
        string,
        { destination: string; type: number }
    >
    const path = removeFirstSlash(request.nextUrl.pathname) as string
    if (!redirects || !redirects[path]) {
        return NextResponse.next()
    }
    if (redirects[path].type === 301) {
        return NextResponse.redirect(
            `${process.env.SITE_URL}/${removeFirstSlash(redirects[path].destination)}`,
            301
        )
    }
    if (redirects[path].type === 410) {
        return new Response(null, { status: 410 })
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - api (API routes)
         * - favicon.ico, sitemap files, robots.txt
         * - WordPress paths (wp-admin, wp-content, wp-includes, wp-json, wp-login etc.)
         * - Common admin/bot probe paths (segment-matched)
         * - Static assets and PHP files
         */
        '/((?!_next/static|_next/image|api|favicon\\.ico|.*-sitemap\\.xml|sitemap_index\\.xml|robots\\.txt|wp-|(?:login|admin|administrator|user|cms|backend)(?:/|$)|.*\\.(?:webp|png|jpg|jpeg|gif|svg|ico|woff2?|php)).*)',
    ],
}
