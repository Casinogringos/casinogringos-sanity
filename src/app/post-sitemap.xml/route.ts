import { getServerSideSitemap } from 'next-sitemap'
import { getSitemap } from '@/src/lib/api'
import { sitemapImages } from '@/src/lib/utils'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import ImageService from '@/src/services/ImageService'
import CasinoPageService from '@/src/services/CasinoPageService'

const imageService = new ImageService()
const casinoPageService = new CasinoPageService()

export async function GET() {
  const casinoPagesResponse: CasinoPageSchemaType[] =
    await getSitemap('casino-pages')
  const casinoPages = casinoPagesResponse.map((page) => {
    const featuredImage = page.featuredImage?.src
    const seoImage = page.seoImage?.src
    const contentImages = imageService.getImagesFromModularContent(page.content)
    const allImages = featuredImage
      ? [
          featuredImage,
          seoImage === featuredImage ? null : seoImage,
          ...(contentImages ? contentImages : []),
        ]
      : contentImages
        ? contentImages
        : []
    const imagesXML = sitemapImages(
      allImages.filter((image): image is string => image !== null)
    )
    const lastModTimestamp = casinoPageService.getPageModifiedAtTimestamp(page)

    return {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}${page.slug.current}`,
      ...(lastModTimestamp ? { lastmod: new Date(lastModTimestamp).toISOString() } : {}),
      images: imagesXML,
    }
  })

  return getServerSideSitemap(casinoPages)
}

export const dynamic = 'force-static'
