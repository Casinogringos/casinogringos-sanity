import { getServerSideSitemap } from 'next-sitemap'
import { getSitemapNews, getNodeByUri } from '@/lib/api'
import { getImagesFromContent, sitemapImages } from '@/lib/helpers'
import { Page } from '@/types/index'

export async function GET() {
  const newsIndexResponse = (await getNodeByUri({
    uri: '/nyheter',
  })) as Page
  const newsItemsResponse = await getSitemapNews()
  const itemsPages = newsItemsResponse.edges.map(({ node }) => {
    const featuredImage = node.featuredImage?.node.sourceUrl ?? null
    const contentImages = getImagesFromContent(node.content)
    const allImages = featuredImage
      ? [featuredImage, ...contentImages]
      : contentImages
    const imagesXML = sitemapImages(allImages)

    return {
      loc: `${process.env.SITE_URL}/nyheter/${node.slug}`,
      lastmod: `${node.modified}+01:00`,
      images: imagesXML,
      news: {
        publicationName: 'Casinogringos',
        publicationLanguage: 'sv-SE',
        date: `${node.date}+01:00`,
        title: node.title,
      },
    }
  })
  const indexPage = () => {
    const featuredImage =
      newsIndexResponse.featuredImage?.node.sourceUrl ?? null
    const contentImages = getImagesFromContent(newsIndexResponse.content || '')
    const allImages = featuredImage
      ? [featuredImage, ...contentImages]
      : contentImages
    const imagesXML = sitemapImages(allImages)

    return {
      loc: `${process.env.SITE_URL}/nyheter`,
      lastmod: `${newsIndexResponse.modified}+01:00`,
      images: imagesXML,
    }
  }

  return getServerSideSitemap([indexPage(), ...itemsPages])
}
