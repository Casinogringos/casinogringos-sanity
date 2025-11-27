import { getSitemap } from '@/src/lib/api'
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
      const imagesXML = imageService
        .getImagesXML(allImages)
        .filter((image) => image !== null)
      const lastModTimestamp = subPageService.getPageModifiedAtTimestamp(page)
      return {
        loc: `${process.env.NEXT_PUBLIC_SITE_URL}${page.slug.current}`,
        lastmod: `${new Date(lastModTimestamp ?? '').toISOString().slice(0, -1)}+01:00`,
        images: imagesXML,
      }
    })

  return getServerSideSitemap(pages)
}
