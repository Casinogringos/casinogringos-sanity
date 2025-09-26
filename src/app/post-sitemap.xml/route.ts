import { getServerSideSitemap } from 'next-sitemap'
import { getSitemap } from '@/src/lib/api'
import { sitemapImages } from '@/src/lib/helpers'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import ImageService from '@/src/services/ImageService'

const imageService = new ImageService()

export async function GET() {
    const casinoPagesResponse: CasinoPageSchemaType[] = await getSitemap('casino-pages')
    const casinoPages = casinoPagesResponse.map((page) => {
        const featuredImage = page.featuredImage?.src
        const seoImage = page.seoImage?.src
        const contentImages = imageService.getImagesFromModularContent(page.content)
        const allImages = featuredImage
            ? [featuredImage, seoImage === featuredImage ? null : seoImage, ...(contentImages ? contentImages : [])]
            : contentImages ? contentImages : []
        const imagesXML = sitemapImages(allImages.filter((image) => image !== null)).filter((image) => image !== null)

        return {
            loc: `${process.env.SITE_URL}${page.slug.current}`,
            lastmod: `${page._updatedAt ?? page.originalModifiedAt}+01:00`,
            images: imagesXML,
        }
    })

    return getServerSideSitemap(casinoPages)
}
