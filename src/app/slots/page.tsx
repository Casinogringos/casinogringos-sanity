import { getPageBySlug, getSlotPagePreviews } from '@/src/lib/api'
import SlotIndex from '@/src/app/SlotIndex'
import { notFound } from 'next/navigation'

// export async function generateMetadata() {
//   const item = (await getNodeByUri({ uri: '/slots' })) as PageType
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

export default async function Page() {
  const slots = await getSlotPagePreviews({})
  const page = await getPageBySlug({ slug: '/slots' })
  if (!page) {
    return notFound()
  }
  // console.log('page@', page)

  return <SlotIndex page={page} slots={slots} />
}

export const dynamic = 'force-static'
