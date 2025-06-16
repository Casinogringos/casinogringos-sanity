// import { getServerSideSitemap } from 'next-sitemap'
// import { getSitemapPosts } from '@/lib/api'
// import { getImagesFromContent, sitemapImages } from '@/lib/helpers'
//
// export async function GET() {
//   const postsResponse = await getSitemapPosts()
//   const posts = postsResponse.edges.map(({ node }) => {
//     const featuredImage = node.featuredImage?.node.sourceUrl ?? null
//     const contentImages = getImagesFromContent(node.content)
//     const allImages = featuredImage
//       ? [featuredImage, ...contentImages]
//       : contentImages
//     const imagesXML = sitemapImages(allImages)
//
//     return {
//       loc: `${process.env.SITE_URL}/${node.slug}`,
//       lastmod: `${node.modified}+01:00`,
//       images: imagesXML,
//     }
//   })
//
//   return getServerSideSitemap(posts)
// }
