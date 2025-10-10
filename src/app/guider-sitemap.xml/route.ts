import { getServerSideSitemap } from 'next-sitemap'
import { getPageBySlug, getSitemap } from '@/src/lib/api'
import { GuidePageSchemaType, SubPageSchemaType } from '@/src/schemas'
import ImageService from '@/src/services/ImageService'
import { IImageEntry } from 'next-sitemap'
import GuidePageService from '@/src/services/GuidePageService'

const imageService = new ImageService()
const guidePageService = new GuidePageService()

export async function GET() {
  const guidesIndexPage: SubPageSchemaType = await getPageBySlug({
    slug: '/guider',
  })
  const guidePages: GuidePageSchemaType[] = await getSitemap('guide-pages')
  const itemsPages = guidePages.map((page) => {
    const contentImages = imageService.getImagesFromModularContent(page.content)
    const pageImages = guidePageService.getImagesFromPage(page)
    let allImages = []
    if (contentImages?.length) {
      allImages.push(...contentImages)
    }
    if (pageImages?.length) {
      allImages.push(...pageImages)
    }
    const imagesXML: IImageEntry[] = imageService.getImagesXML(allImages)

    return {
      loc: `${process.env.SITE_URL}${page.slug.current}`,
      lastmod: `${page._updatedAt ?? page.originalModifiedAt}+01:00`,
      images: imagesXML,
    }
  })
  const indexPage = () => {
    const contentImages = imageService.getImagesFromModularContent(
      guidesIndexPage.content
    )
    let allImages = []
    if (contentImages?.length) {
      allImages.push(...contentImages)
    }
    const imagesXML: IImageEntry[] = imageService.getImagesXML(allImages).filter((image) => image !== null)

    return {
      loc: `${process.env.SITE_URL}${guidesIndexPage.slug.current}`,
      lastmod: `${guidesIndexPage._updatedAt ?? guidesIndexPage.originalModifiedAt}+01:00`,
      images: imagesXML,
    }
  }

  return getServerSideSitemap([indexPage(), ...itemsPages])
}
