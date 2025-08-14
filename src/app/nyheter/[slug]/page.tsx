import { notFound } from 'next/navigation'
import NewsPage from '@/src/app/NewsPage'
import { getNewsPageBySlug, getStaticParams, getSimilarNewsPages } from '@/src/lib/api'
import { formatPageSlug } from '@/src/lib/utility'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import { extractSlugFromUrl } from '@/src/lib/helpers'
import { Metadata } from 'next'

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params
  const newsPage: NewsPageSchemaType = await getNewsPageBySlug({
    slug: `/nyheter${formatPageSlug(params?.slug)}`,
  })
  if (!newsPage) return null

  const siteURL = (process.env.SITE_URL as string) + newsPage.slug.current
  const metadata: Metadata = {
    title: newsPage.seoTitle ?? newsPage.title,
    description: newsPage.seoDescription,
    alternates: {
      canonical: newsPage.canonical,
    },
    openGraph: {
      title: newsPage.seoTitle ?? newsPage.title,
      description: newsPage.seoDescription,
      url: siteURL,
      locale: 'sv_SE',
      siteName: 'Casinogringos',
      type: newsPage.opengraphType ?? 'website',
      images: [
        {
          url: newsPage.seoImage.src,
          alt: newsPage.seoImage.alt,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
  return metadata
}

export default async function Page(props: { params: Params }) {
  const params = await props.params
  const newsPage: NewsPageSchemaType = await getNewsPageBySlug({
    slug: `/nyheter${formatPageSlug(params?.slug)}`,
  })
  if (!newsPage) return notFound()
  const similarNews: NewsPagePreviewSchemaType[] = await getSimilarNewsPages({
    id: newsPage._id,
    count: 5,
  })

  return <NewsPage page={newsPage} similarNews={similarNews} />
}

export async function generateStaticParams() {
  const allNewsPages: NewsPagePreviewSchemaType[] = await getStaticParams('news-pages')

  return allNewsPages.map((page) => {
    const slug = page.slug.current.replace('/nyheter/', '')
    return { slug }
  })
}
