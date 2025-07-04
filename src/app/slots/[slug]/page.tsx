import { getSlotPageBySlug } from '@/src/lib/api'
import { notFound } from 'next/navigation'
import SlotPage from '@/src/app/SlotPage'
import { SlotPage as SlotType } from '@/src/types'
import { formatPageSlug } from '@/src/lib/utility'

type Params = Promise<{ slug: string }>

// export async function generateMetadata(props: { params: Params }) {
//   const params = await props.params;
//   const item = (await getNodeByUri({
//     uri: `/slots/${params?.slug}`,
//   })) as SlotType;
//   const siteURL = (process.env.SITE_URL as string) + item.uri;
//   if (!item?.seo?.opengraphImage) throw new Error("SEO is missing");
//   const metadata = {
//     title: item?.seo?.title ? item?.seo?.title : item?.title,
//     description: item?.seo?.metaDesc,
//     alternates: {
//       canonical:
//         process.env.SITE_URL + extractSlugFromUrl(item?.seo?.canonical),
//     },
//     openGraph: {
//       title: item?.seo?.title,
//       description: item?.seo?.metaDesc,
//       url: siteURL,
//       locale: "sv_SE",
//       siteName: item?.seo?.opengraphSiteName,
//       type: item?.seo?.opengraphType,
//       images: [
//         {
//           url: item?.seo?.opengraphImage?.sourceUrl ?? "",
//           alt: item?.seo?.opengraphImage?.altText ?? "",
//           width: item?.seo?.opengraphImage?.mediaDetails?.width ?? 1200,
//           height: item?.seo?.opengraphImage?.mediaDetails?.height ?? 630,
//         },
//       ],
//     },
//   };
//
//   return metadata as Metadata;
// }

export default async function Page(props: { params: Params }) {
  const params = await props.params
  const slotPage = (await getSlotPageBySlug({
    slug: `/slots${formatPageSlug(params?.slug)}`,
  })) as SlotType
  // const slots = await getSlotPreviews({ count: 5 })
  // const similarSlots = slot
  //   ? slots.edges.filter(({ node }) => node.id !== slot.id).splice(0, 4)
  //   : null

  if (slotPage) {
    return <SlotPage page={slotPage} />
  } else return notFound()
}

// export async function generateStaticParams() {
//   const allSlots = await getStaticParams('slot')
//
//   return allSlots.map(({ node }) => ({ slug: node.slug }))
// }
