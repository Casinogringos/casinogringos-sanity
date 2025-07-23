import { getServerSideSitemap } from 'next-sitemap'
import { getSitemap } from '@/src/lib/api'
import { sitemapImages } from '@/src/lib/helpers'
import { CasinoPageSchemaType } from '@/src/schemas'
import { urlFor } from '@/src/lib/client'
import ImageService from '@/src/services/ImageService'

const imageService = new ImageService()

export async function GET() {
    const casinoPagesResponse: CasinoPageSchemaType[] = await getSitemap('casino-pages')
    const casinoPages = casinoPagesResponse.map((page) => {
        const featuredImage = urlFor(page.seoImage).url()
        const contentImages = imageService.getImagesFromModularContent(page.content)
        const allImages = featuredImage
            ? [featuredImage, ...(contentImages ? contentImages : [])]
            : contentImages ? contentImages : []
        const imagesXML = sitemapImages(allImages)

        return {
            loc: `${process.env.SITE_URL}/${page.slug.current}`,
            lastmod: `${page._updatedAt ?? page.originalModifiedAt}+01:00`,
            images: imagesXML,
        }
    })

    return getServerSideSitemap(casinoPages)
}
