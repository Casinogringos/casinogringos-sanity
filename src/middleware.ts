import { NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

const removeFirstSlash = (path: string) => {
    return path.replace(/^\//, '')
}

export async function middleware(request: NextRequest) {
    // const searchParams = request.nextUrl.searchParams
    // if (searchParams.has('s')) {
    //   return new Response(null, {
    //     status: 404,
    //     headers: {
    //       Location: `${process.env.SITE_URL}/404`,
    //     },
    //   })
    // }
    const redirects = (await get('redirects')) as Record<
        string,
        { destination: string; type: number }
    >
    console.log('redirects', redirects)
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
