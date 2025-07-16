import { getServerSideSitemap } from 'next-sitemap'
import { sitemapImages } from '@/src/lib/helpers'
import { getPageBySlug, getSitemap } from '@/src/lib/api'
import { urlFor } from '@/src/lib/client'
import { GuidePageSchemaType, SubPageSchemaType } from '@/src/schemas'
import ImageService from '@/src/services/ImageService'

const imageService = new ImageService()

export async function GET() {
  const guidesIndexPage: SubPageSchemaType = await getPageBySlug({
    slug: '/guider',
  })
  const guidePages: GuidePageSchemaType[] = await getSitemap('guide-pages')
  const itemsPages = guidePages.map((page) => {
    const featuredImage = urlFor(page.featuredImage.image).url()
    const contentImages = imageService.getImagesFromModularContent(page.content)
    const allImages = featuredImage
      ? [featuredImage, ...contentImages]
      : contentImages
    const imagesXML = imageService.getImageXML(allImages)

    return {
      loc: `${process.env.SITE_URL}/guider/${page.slug.current}`,
      lastmod: `${page._updatedAt ?? page.originalModifiedAt}+01:00`,
      images: imagesXML,
    }
  })
  const indexPage = () => {
    const featuredImage = urlFor(guidesIndexPage.seoImage).url()
    const contentImages = getImagesFromModularContent(guidesIndexPage.content)
    const allImages = featuredImage
      ? [featuredImage, ...contentImages]
      : contentImages
    const imagesXML = sitemapImages(allImages)

    return {
      loc: `${process.env.SITE_URL}/guider`,
      lastmod: `${guidesIndexPage._updatedAt ?? guidesIndexPage.originalModifiedAt}+01:00`,
      images: imagesXML,
    }
  }

  return getServerSideSitemap([indexPage(), ...itemsPages])
}
