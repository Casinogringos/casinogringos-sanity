import { getServerSideSitemapIndex } from 'next-sitemap'

export async function GET() {
    return getServerSideSitemapIndex([
        `${process.env.NEXT_PUBLIC_SITE_URL}/page-sitemap.xml`,
        `${process.env.NEXT_PUBLIC_SITE_URL}/guider-sitemap.xml`,
        `${process.env.NEXT_PUBLIC_SITE_URL}/nyheter-sitemap.xml`,
        `${process.env.NEXT_PUBLIC_SITE_URL}/slots-sitemap.xml`,
        `${process.env.NEXT_PUBLIC_SITE_URL}/author-sitemap.xml`,
        `${process.env.NEXT_PUBLIC_SITE_URL}/post-sitemap.xml`,
    ])
}
