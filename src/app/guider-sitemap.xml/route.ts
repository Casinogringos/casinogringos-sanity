import { getServerSideSitemap } from 'next-sitemap'
import { getSitemapGuides, getNodeByUri } from '@/lib/api'
import { getImagesFromContent, sitemapImages } from '@/lib/helpers'
import { Page } from '@/types/index'

export async function GET() {
  const guidesIndexResponse = (await getNodeByUri({
    uri: '/guider',
  })) as Page
  const guidesItemsResponse = await getSitemapGuides()
  const itemsPages = guidesItemsResponse.edges.map(({ node }) => {
    const featuredImage = node.featuredImage?.node.sourceUrl ?? null
    const contentImages = getImagesFromContent(node.editorBlocks)
    const allImages = featuredImage
      ? [featuredImage, ...contentImages]
      : contentImages
    const imagesXML = sitemapImages(allImages)

    return {
      loc: `${process.env.SITE_URL}/guider/${node.slug}`,
      lastmod: `${node.modified}+01:00`,
      images: imagesXML,
    }
  })
  const indexPage = () => {
    const featuredImage =
      guidesIndexResponse.featuredImage?.node.sourceUrl ?? null
    const contentImages = getImagesFromContent(
      guidesIndexResponse.content || ''
    )
    const allImages = featuredImage
      ? [featuredImage, ...contentImages]
      : contentImages
    const imagesXML = sitemapImages(allImages)

    return {
      loc: `${process.env.SITE_URL}/guider`,
      lastmod: `${guidesIndexResponse.modified}+01:00`,
      images: imagesXML,
    }
  }

  return getServerSideSitemap([indexPage(), ...itemsPages])
}
