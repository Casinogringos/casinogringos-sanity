import { getServerSideSitemap } from 'next-sitemap'
import { getSitemapAuthors } from '@/lib/api'

export async function GET() {
  const authorsResponse = await getSitemapAuthors()
  const pages = authorsResponse.edges
    .filter(({ node }) => {
      if (!node.seo) throw new Error('SEO is missing')
      return node.seo.metaRobotsNoindex !== 'noindex'
    })
    .map(({ node }) => {
      return {
        loc: `${process.env.SITE_URL}/om-oss/${node.slug}`,
      }
    })

  return getServerSideSitemap(pages)
}
