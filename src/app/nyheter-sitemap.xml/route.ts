import { getPageBySlug, getSitemap } from '@/src/lib/api'
import { sitemapImages } from '@/src/lib/utils'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import ImageService from '@/src/services/ImageService'
import { getServerSideSitemap } from 'next-sitemap'
import NewsPageService from '@/src/services/NewsPageService'

const imageService = new ImageService()
const newsPageService = new NewsPageService()

export async function GET() {
  const newsIndexPage = await getPageBySlug({ slug: '/nyheter' })
  const newsPagesResponse: NewsPageSchemaType[] = await getSitemap('news-pages')
  const newsPages = newsPagesResponse.map((page) => {
    const featuredImage = page.featuredImage?.src
    const contentImages = imageService.getImagesFromModularContent(page.content)
    const allImages = featuredImage
      ? [featuredImage, ...(contentImages ? contentImages : [])]
      : contentImages
        ? contentImages
        : []
    const imagesXML = sitemapImages(allImages)
    const lastModTimestamp = newsPageService.getPageModifiedAtTimestamp(page)
    return {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/nyheter/${page.slug.current}`,
      ...(lastModTimestamp ? { lastmod: new Date(lastModTimestamp).toISOString() } : {}),
      images: imagesXML,
    }
  })
  const indexPage = () => {
    const featuredImage = newsIndexPage.featuredImage?.src
    const contentImages = imageService.getImagesFromModularContent(
      newsIndexPage.content
    )
    const allImages = featuredImage
      ? [featuredImage, ...(contentImages ? contentImages : [])]
      : contentImages
        ? contentImages
        : []
    const imagesXML = sitemapImages(allImages)
    const lastModTimestamp =
      newsPageService.getPageModifiedAtTimestamp(newsIndexPage)
    return {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/nyheter`,
      ...(lastModTimestamp ? { lastmod: new Date(lastModTimestamp).toISOString() } : {}),
      images: imagesXML,
    }
  }

  return getServerSideSitemap([indexPage(), ...newsPages])
}

export const dynamic = 'force-static'
