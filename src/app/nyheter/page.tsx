// import { getPageBySlug } from '@/src/lib/api'
import NewsIndex from '@/src/app/NewsIndex'
import Pagination from '@/src/components/organisms/Pagination'
import { getNewsPageCount, getNewsPagePreviews } from '@/src/lib/api'
// import Pagination from '@/src/app/components/organisms/Pagination'
// import BreadCrumbs from '@/src/app/components/organisms/BreadCrumbs'
// import { extractSlugFromUrl } from '@/src/lib/helpers'
// import { Metadata } from 'next'
// import { Page as PageType } from '@/src/types'

// export async function generateMetadata() {
//   const item = (await getNodeByUri({
//     uri: '/nyheter',
//   })) as PageType
//   const siteURL = (process.env.SITE_URL as string) + item.uri
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
//
//   return metadata as Metadata
// }
const Page = async () => {
  const news = await getNewsPagePreviews({ count: 24, offset: 0 })
  const newsCount = await getNewsPageCount()
  const pageCount = Math.ceil(newsCount / 24)
  const breadcrumbItems = [
    {},
    {
      text: 'Nyheter',
      url: `${process.env.SITE_URL}/nyheter`,
    },
  ]

  return (
    <>
      {/*<BreadCrumbs items={breadcrumbItems} />*/}
      <NewsIndex news={news} />
      {pageCount > 1 && (
        <Pagination
          currentPage={1}
          numPages={pageCount}
          pathPrefix={'nyheter'}
        />
      )}
    </>
  )
}

export default Page
