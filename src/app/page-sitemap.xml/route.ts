import { getSitemap } from '@/src/lib/api'
import { sitemapImages } from '@/src/lib/utils'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import ImageService from '@/src/services/ImageService'
import { getServerSideSitemap } from 'next-sitemap'
import SubPageService from '@/src/services/SubPageService'

const imageService = new ImageService()
const subPageService = new SubPageService()

export async function GET() {
  const pagesResponse: SubPageSchemaType[] = await getSitemap('pages')
  const pages = pagesResponse
    .filter((page) => {
      return (
        page.slug.current !== '/guider' &&
        page.slug.current !== '/nyheter' &&
        page.slug.current !== '/slots'
      )
    })
    .map((page) => {
      const featuredImage = page.seoImage?.src
      const contentImages = imageService.getImagesFromModularContent(
        page.content
      )
      const allImages = featuredImage
        ? [featuredImage, ...(contentImages ? contentImages : [])]
        : contentImages
          ? contentImages
          : []
      const imagesXML = sitemapImages(allImages)
      const lastModTimestamp = subPageService.getPageModifiedAtTimestamp(page)
      return {
        loc: `${process.env.NEXT_PUBLIC_SITE_URL}${page.slug.current}`,
        ...(lastModTimestamp ? { lastmod: new Date(lastModTimestamp).toISOString() } : {}),
        images: imagesXML,
      }
    })

  return getServerSideSitemap(pages)
}

export const dynamic = 'force-static'
