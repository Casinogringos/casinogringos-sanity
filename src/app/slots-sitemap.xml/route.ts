import { getServerSideSitemap } from 'next-sitemap'
import { getPageBySlug, getSitemap } from '@/src/lib/api'
import { sitemapImages } from '@/src/lib/utils'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'
import ImageService from '@/src/services/ImageService'
import SlotPageService from '@/src/services/SlotPageService'
import SubPageService from '@/src/services/SubPageService'

const imageService = new ImageService()
const slotPageService = new SlotPageService()
const subPageService = new SubPageService()

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
    const imagesXML = sitemapImages(allImages)
    const lastModTimestamp = slotPageService.getPageModifiedAtTimestamp(page)
    return {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/slots/${page.slug.current}`,
      ...(lastModTimestamp ? { lastmod: new Date(lastModTimestamp).toISOString() } : {}),
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
    const imagesXML = sitemapImages(allImages)
    const lastModTimestamp =
      subPageService.getPageModifiedAtTimestamp(slotsIndexResponse)
    return {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/slots`,
      ...(lastModTimestamp ? { lastmod: new Date(lastModTimestamp).toISOString() } : {}),
      images: imagesXML,
    }
  }

  return getServerSideSitemap([indexPage(), ...slotsPages])
}

export const dynamic = 'force-static'
