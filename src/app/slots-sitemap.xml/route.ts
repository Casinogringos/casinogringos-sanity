import { getServerSideSitemap } from 'next-sitemap'
import { getPageBySlug, getSitemap } from '@/src/lib/api'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'
import ImageService from '@/src/services/ImageService'

const imageService = new ImageService()

export async function GET() {
  const slotsIndexResponse = (await getPageBySlug({
    slug: '/slots',
  })) as SubPageSchemaType
  const slotsPagesResponse: SlotPageSchemaType[] =
    await getSitemap('slot-pages')
  const slotsPages = slotsPagesResponse.map((page) => {
    const featuredImage = page.seoImage?.src
    const contentImages = imageService.getImagesFromModularContent(page.content)
    const allImages = featuredImage
      ? [featuredImage, ...contentImages]
      : contentImages
    const imagesXML = imageService
      .getImagesXML(allImages)
      .filter((image) => image !== null)

    return {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}${page.slug.current}`,
      lastmod: `${page._updatedAt ?? page.originalModifiedAt}+01:00`,
      images: imagesXML,
    }
  })

  const indexPage = () => {
    const featuredImage = slotsIndexResponse.seoImage?.src
    const contentImages = imageService.getImagesFromModularContent(
      slotsIndexResponse.content
    )
    const allImages = featuredImage
      ? [featuredImage, ...contentImages]
      : contentImages
    const imagesXML = imageService
      .getImagesXML(allImages)
      .filter((image) => image !== null)

    return {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/slots`,
      lastmod: `${slotsIndexResponse._updatedAt ?? slotsIndexResponse.originalModifiedAt}+01:00`,
      images: imagesXML,
    }
  }

  return getServerSideSitemap([indexPage(), ...slotsPages])
}
