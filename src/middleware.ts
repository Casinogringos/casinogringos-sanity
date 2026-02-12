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
