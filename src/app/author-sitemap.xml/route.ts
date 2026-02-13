import { getServerSideSitemap } from 'next-sitemap'
import { getSitemap } from '@/src/lib/api'
import { sitemapImages } from '@/src/lib/utils'
import { AuthorSchemaType } from '@/src/schemas/author'
import AuthorService from '@/src/services/AuthorService'
import ImageService from '@/src/services/ImageService'

const authorService = new AuthorService()
const imageService = new ImageService()

export async function GET() {
  const authorsResponse: AuthorSchemaType[] = await getSitemap('authors')
  const pages = authorsResponse.map((page) => {
    const pageImages = authorService.getImagesFromPage(page)
    const imagesXML = sitemapImages(pageImages)
    const lastModTimestamp = page._updatedAt
      ? new Date(page._updatedAt).getTime()
      : page._createdAt
        ? new Date(page._createdAt).getTime()
        : null
    return {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/om-oss/${page.slug.current}`,
      ...(lastModTimestamp ? { lastmod: new Date(lastModTimestamp).toISOString() } : {}),
      images: imagesXML,
    }
  })

  return getServerSideSitemap(pages)
}

export const dynamic = 'force-static'
