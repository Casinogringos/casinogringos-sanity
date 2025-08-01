import { getServerSideSitemap } from 'next-sitemap'
import { getPageBySlug, getSitemap } from '@/src/lib/api'
import { NewsPageSchemaType } from '@/src/schemas'
import { urlFor } from '@/src/lib/client'
import ImageService from '@/src/services/ImageService'

const imageService = new ImageService()

export async function GET() {
    const newsIndexPage = await getPageBySlug({ slug: '/nyheter' })
    const newsPagesResponse: NewsPageSchemaType[] = await getSitemap('news-pages')
    const newsPages = newsPagesResponse.map((page) => {
        const featuredImage = urlFor(page.featuredImage.image).url()
        const contentImages = imageService.getImagesFromModularContent(page.content)
        const allImages = featuredImage
            ? [featuredImage, ...(contentImages ? contentImages : [])]
            : contentImages ? contentImages : []
        const imagesXML = imageService.getImagesXML(allImages).filter((image) => image !== null)

        return {
            loc: `${process.env.SITE_URL}/nyheter/${page.slug.current}`,
            lastmod: `${page._updatedAt ?? page.originalModifiedAt}+01:00`,
            images: imagesXML,
            news: {
                publicationName: 'Casinogringos',
                publicationLanguage: 'sv-SE',
                date: `${page.originalPublishedAt ?? page._createdAt}+01:00`,
                title: page.title,
            },
        }
    })
    const indexPage = () => {
        const featuredImage =
            newsIndexPage.featuredImage?.image ?? null
        const contentImages = imageService.getImagesFromModularContent(newsIndexPage.content)
        const allImages = featuredImage
            ? [featuredImage, ...(contentImages ? contentImages : [])]
            : contentImages ? contentImages : []
        const imagesXML = imageService.getImagesXML(allImages).filter((image) => image !== null)

        return {
            loc: `${process.env.SITE_URL}/nyheter`,
            lastmod: `${newsIndexPage._updatedAt ?? newsIndexPage.originalModifiedAt}+01:00`,
            images: imagesXML,
        }
    }

    return getServerSideSitemap([indexPage(), ...newsPages])
}
