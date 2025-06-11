import { getGuidePreviews, getNodeByUri, getStaticParams } from '@/lib/api'
import { notFound } from 'next/navigation'
import NewsPage from '@/src/app/NewsPage'
import BreadCrumbs from '../../../../../casinogringos-v3/src/components/BreadCrumbs'
import { extractSlugFromUrl } from '@/lib/helpers'
import { Metadata } from 'next'
import { Guide } from '@/types/index'

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params
  const item = (await getNodeByUri({
    uri: `/guider/${params?.slug}`,
  })) as Guide
  const siteURL = (process.env.SITE_URL as string) + item.uri
  const metadata = {
    title: item.seo.title ?? item.title,
    description: item.seo.metaDesc,
    alternates: {
      canonical: process.env.SITE_URL + extractSlugFromUrl(item.seo.canonical),
    },
    openGraph: {
      title: item.title,
      description: item.seo.metaDesc,
      url: siteURL,
      locale: 'sv_SE',
      siteName: item.seo.opengraphSiteName,
      type: item.seo.opengraphType,
      images: [
        {
          url: item.seo.opengraphImage?.sourceUrl ?? '',
          alt: item.seo.opengraphImage?.altText ?? '',
          width: item.seo.opengraphImage?.mediaDetails.width ?? 1200,
          height: item.seo.opengraphImage?.mediaDetails.height ?? 630,
        },
      ],
    },
  }

  return metadata as Metadata
}

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const article = (await getNodeByUri({
    uri: `/guider/${params.slug}`,
  })) as Guide
  if (!article?.slug) return notFound()
  const articles = await getGuidePreviews({ count: 5 })
  const similarArticles = articles.edges
    .filter(({ node }) => node.id !== article.id)
    .splice(0, 4)

  return (
    <>
      {article.seo.breadcrumbs && (
        <BreadCrumbs
          items={article.seo.breadcrumbs}
          index={{ text: 'Guider', url: `${process.env.SITE_URL}/guider` }}
        />
      )}
      <NewsPage article={article} similarArticles={similarArticles} />
    </>
  )
}

export async function generateStaticParams() {
  const allGuides = await getStaticParams('guide')

  return allGuides.map(({ node }) => ({ slug: node.slug }))
}
