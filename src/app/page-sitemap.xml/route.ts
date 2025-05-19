import { getServerSideSitemap } from 'next-sitemap'
import { getSitemapPages } from '@/lib/api'
import { getImagesFromContent, sitemapImages } from '@/lib/helpers'

export async function GET() {
  const pagesResponse = await getSitemapPages()
  const pages = pagesResponse.edges
    .filter(({ node }) => {
      return (
        node.uri !== '/guider' &&
        node.uri !== '/nyheter' &&
        node.uri !== '/slots'
      )
    })
    .map(({ node }) => {
      const featuredImage = node.featuredImage?.node.sourceUrl ?? null
      const contentImages = getImagesFromContent(node.content)
      const allImages = featuredImage
        ? [featuredImage, ...contentImages]
        : contentImages
      const imagesXML = sitemapImages(allImages)

      return {
        loc: `${process.env.SITE_URL}${node.uri !== '/' ? node.uri : ''}`,
        lastmod: `${node.modified}+01:00`,
        images: imagesXML,
      }
    })

  return getServerSideSitemap(pages)
}
