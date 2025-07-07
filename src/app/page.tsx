import HomePage from '@/src/app/HomePage'
import { getNewsPagePreviews, getPageBySlug } from '@/src/lib/api'
import { notFound } from 'next/navigation'

// export async function generateMetadata() {
//   const homepage = (await getPageBySlug({
//     slug: '/',
//   })) as PageType
//   const siteURL = process.env.SITE_URLs
//   const metadata = {
//     title: homepage.seo.title ?? homepage.title,
//     description: homepage.seo.metaDesc,
//     alternates: {
//       canonical: siteURL,
//     },
//     openGraph: {
//       title: homepage.seo.title,
//       description: homepage.seo.metaDesc,
//       url: siteURL,
//       locale: 'sv_SE',
//       siteName: homepage.seo.opengraphSiteName,
//       images: [
//         {
//           url: homepage.seo.opengraphImage?.sourceUrl ?? '',
//           alt: homepage.seo.opengraphImage?.altText ?? '',
//           width: homepage.seo.opengraphImage?.mediaDetails.width ?? 1200,
//           height: homepage.seo.opengraphImage?.mediaDetails.height ?? 630,
//         },
//       ],
//     },
//   } as Metadata
//
//   return metadata
// }

export default async function Page() {
  const homepage = await getPageBySlug({
    slug: '/',
  })
  // console.log('homepage', homepage)

  // const guides = await getGuidePreviews({ count: 3 })
  const news = await getNewsPagePreviews({ count: 3, offset: 0 })
  const breadcrumbs = [
    {
      url: '/',
    },
  ]
  if (!homepage) return notFound()

  return <HomePage page={homepage} news={news} breadcrumbs={breadcrumbs} />
}
