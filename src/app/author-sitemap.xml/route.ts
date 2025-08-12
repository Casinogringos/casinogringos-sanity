import { getServerSideSitemap, IImageEntry } from 'next-sitemap'
import { getSitemap } from '@/src/lib/api'
import { AuthorSchemaType } from '@/src/schemas/author'
import AuthorService from '@/src/services/AuthorService'
import ImageService from '@/src/services/ImageService'

const authorService = new AuthorService()
const imageService = new ImageService()

export async function GET() {
  const authorsResponse: AuthorSchemaType[] = await getSitemap('authors')
  const pages = authorsResponse.map((page) => {
    const pageImages = authorService.getImagesFromPage(page)
    const imagesXML: IImageEntry[] = imageService.getImagesXML(pageImages)
    return {
      loc: `${process.env.SITE_URL}/om-oss/${page.slug.current}`,
      images: imagesXML,
    }
  })

  return getServerSideSitemap(pages)
}
