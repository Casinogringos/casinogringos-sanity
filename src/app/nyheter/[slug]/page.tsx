import NewsPage from '@/src/app/NewsPage'
import {
  getNewsPageBySlug,
  getSimilarNewsPages,
  getStaticParams,
} from '@/src/lib/api'
import { formatSlug } from '@/src/lib/utils'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params
  const newsPage: NewsPageSchemaType = await getNewsPageBySlug({
    slug: params?.slug,
  })
  if (!newsPage) return null

  const siteURL =
    (process.env.NEXT_PUBLIC_SITE_URL as string) +
    '/nyheter/' +
    newsPage.slug.current

  const metadata: Metadata = {
    title: newsPage.seoTitle ?? newsPage.title,
    description: newsPage.seoDescription,
    alternates: {
      canonical: newsPage.canonical ?? new URL(siteURL),
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
    slug: params?.slug,
  })
  if (!newsPage) return notFound()
  const similarNews: NewsPagePreviewSchemaType[] = await getSimilarNewsPages({
    slug: newsPage.slug.current,
    count: 4,
  })

  return <NewsPage page={newsPage} similarNews={similarNews} />
}

export async function generateStaticParams() {
  const allNewsPages: NewsPagePreviewSchemaType[] =
    await getStaticParams('news-pages')

  return allNewsPages
    .filter(
      (page) => page.slug?.current !== null && page.slug?.current !== undefined
    )
    .map((page) => {
      return { slug: page.slug.current }
    })
}
