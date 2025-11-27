import { getServerSideSitemap } from 'next-sitemap'
import { getPageBySlug, getSitemap } from '@/src/lib/api'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import ImageService from '@/src/services/ImageService'
import { IImageEntry } from 'next-sitemap'
import GuidePageService from '@/src/services/GuidePageService'
import SubPageService from '@/src/services/SubPageService'

const imageService = new ImageService()
const guidePageService = new GuidePageService()
const subPageService = new SubPageService()

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
    const lastModTimestamp = guidePageService.getPageModifiedAtTimestamp(page)
    return {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}${page.slug.current}`,
      lastmod: `${new Date(lastModTimestamp ?? '').toISOString().slice(0, -1)}+01:00`,
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
    const imagesXML: IImageEntry[] = imageService
      .getImagesXML(allImages)
      .filter((image) => image !== null)
    const lastModTimestamp =
      subPageService.getPageModifiedAtTimestamp(guidesIndexPage)
    return {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}${guidesIndexPage.slug.current}`,
      lastmod: `${new Date(lastModTimestamp ?? '').toISOString().slice(0, -1)}+01:00`,
      images: imagesXML,
    }
  }

  return getServerSideSitemap([indexPage(), ...itemsPages])
}
