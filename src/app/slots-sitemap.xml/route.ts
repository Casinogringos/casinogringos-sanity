// import { getServerSideSitemap } from 'next-sitemap'
// import { getNodeByUri, getSitemapSlots } from '@/lib/api'
// import { getImagesFromContent, sitemapImages } from '@/lib/helpers'
// import { Page as PageType } from '@/types/index'
//
// export async function GET() {
//   const slotsIndexResponse = (await getNodeByUri({
//     uri: '/slots',
//   })) as PageType
//   const slotsItemsResponse = await getSitemapSlots()
//   const itemsPages = slotsItemsResponse.edges.map(({ node }) => {
//     const featuredImage = node.featuredImage?.node.sourceUrl ?? null
//     const contentImages = getImagesFromContent(node.content)
//     const allImages = featuredImage
//       ? [featuredImage, ...contentImages]
//       : contentImages
//     const imagesXML = sitemapImages(allImages)
//
//     return {
//       loc: `${process.env.SITE_URL}/slots/${node.slug}`,
//       lastmod: `${node.modified}+01:00`,
//       images: imagesXML,
//     }
//   })
//
//   const indexPage = () => {
//     const featuredImage =
//       slotsIndexResponse.featuredImage?.node.sourceUrl ?? null
//     const contentImages = getImagesFromContent(slotsIndexResponse.content || '')
//     const allImages = featuredImage
//       ? [featuredImage, ...contentImages]
//       : contentImages
//     const imagesXML = sitemapImages(allImages)
//
//     return {
//       loc: `${process.env.SITE_URL}/slots`,
//       lastmod: `${slotsIndexResponse.modified}+01:00`,
//       images: imagesXML,
//     }
//   }
//
//   return getServerSideSitemap([indexPage(), ...itemsPages])
// }
