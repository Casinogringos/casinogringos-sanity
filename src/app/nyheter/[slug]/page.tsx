import { notFound } from 'next/navigation'
import NewsPage from '@/src/app/NewsPage'
import BreadCrumbs from '@/src/app/components/organisms/BreadCrumbs'
import { extractSlugFromUrl } from '@/src/lib/helpers'
import { Metadata } from 'next'
import { News as NewsType } from '@/src/types'
import { getNewsPageBySlug } from '@/src/lib/api'
import { formatPageSlug } from '@/src/lib/utility'

type Params = Promise<{ slug: string }>

// export async function generateMetadata(props: { params: Params }) {
//   const params = await props.params
//   const item = (await getNodeByUri({
//     uri: `/nyheter/${params?.slug}`,
//   })) as NewsType
//
//   if (!item) return null
//
//   const siteURL = (process.env.SITE_URL as string) + item?.uri
//   const metadata = {
//     title: item.seo.title ?? item.title,
//     description: item.seo.metaDesc,
//     alternates: {
//       canonical: process.env.SITE_URL + extractSlugFromUrl(item.seo.canonical),
//     },
//     openGraph: {
//       title: item.title,
//       description: item.seo.metaDesc,
//       url: siteURL,
//       locale: 'sv_SE',
//       siteName: item.seo.opengraphSiteName,
//       type: item.seo.opengraphType,
//       images: [
//         {
//           url: item.seo.opengraphImage?.sourceUrl ?? '',
//           alt: item.seo.opengraphImage?.altText ?? '',
//           width: item.seo.opengraphImage?.mediaDetails.width ?? 1200,
//           height: item.seo.opengraphImage?.mediaDetails.height ?? 630,
//         },
//       ],
//     },
//   }
//   return metadata as Metadata
// }

export default async function Page(props: { params: Params }) {
  const params = await props.params
  const newsPage = (await getNewsPageBySlug({
    slug: `/nyheter${formatPageSlug(params?.slug)}`,
  })) as NewsType
  // const articles = await getAllNews({})
  // const similarArticles = articles?.edges3
  //   .filter(({ node }) => node.id !== article?.id)
  //   .splice(0, 4)

  if (!newsPage) return notFound()

  return (
    <>
      {/*{article.seo.breadcrumbs && (*/}
      {/*  <BreadCrumbs*/}
      {/*    items={article.seo.breadcrumbs}*/}
      {/*    index={{ text: 'Nyheter', url: `${process.env.SITE_URL}/nyheter` }}*/}
      {/*  />*/}
      {/*)}*/}
      <NewsPage page={newsPage} />
    </>
  )
}

// export async function generateStaticParams() {
//   const allNews = await getStaticParams('news')
//
//   return allNews.map(({ node }) => ({ slug: node.slug }))
// }
