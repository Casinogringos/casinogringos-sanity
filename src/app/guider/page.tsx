// import { getPageBySlug } from '@/src/lib/api'
// import GuidesIndex from '@/src/app/GuidesIndex'
// import Pagination from '@/src/app/components/organisms/Pagination'
// import BreadCrumbs from '@/src/app/components/organisms/BreadCrumbs'
// import { extractSlugFromUrl } from '@/src/lib/helpers'
// import { Metadata } from 'next'
// import { Guide } from '@/src/types'

// export async function generateMetadata() {
//   const item = (await getNodeByUri({ uri: '/guider' })) as Guide
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

// export default async function Page() {
//   // const allGuides = await getAllGuidePreviews({})
//   // const guidesCount = allGuides.edges.length
//   // const pageCount = Math.ceil(guidesCount / 24)
//   const breadcrumbItems = [
//     {
//       text: 'Guider',
//       url: `${process.env.SITE_URL}/guider`,
//     },
//   ]
//
//   return (
//     <>
//       <BreadCrumbs items={breadcrumbItems} />
//       <GuidesIndex guides={undefined} />
//       {/*{pageCount > 1 && (*/}
//       {/*  <Pagination*/}
//       {/*    currentPage={1}*/}
//       {/*    numPages={pageCount}*/}
//       {/*    pathPrefix={'guider'}*/}
//       {/*    className={'font'}*/}
//       {/*  />*/}
//       {/*)}*/}
//     </>
//   )
// }
//
// export const dynamic = 'force-static'
