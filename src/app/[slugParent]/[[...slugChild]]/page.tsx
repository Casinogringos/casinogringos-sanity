import SubPage from '@/src/app/SubPage'
// import { getPostPreviews, getPageBySlug, getStaticParams } from '@/src/lib/api'
import { notFound } from 'next/navigation'
import CasinoPage from '@/src/app/CasinoPage'
import { extractSlugFromUrl } from '@/src/lib/helpers'
import { Metadata } from 'next'
import { Post as PostType, Page as PageType } from '@/src/types'
import { getPageBySlug } from '@/src/lib/api'

type Params = Promise<{
  slugParent: string
  slugChild: string[]
}>

// export async function generateStaticParams() {
//   const allPages = await getStaticParams('page')
//   const allPosts = await getStaticParams('post')
//   const allParams = [
//     ...allPages.filter(({ node }) => {
//       return (
//         node.uri !== '/' &&
//         node.uri !== '/guider' &&
//         node.uri !== '/nyheter' &&
//         node.uri !== '/slots' &&
//         node.uri !== '/om-oss'
//       )
//     }),
//     ...allPosts,
//   ]
//
//   return allParams.map(({ node }) => {
//     console.log('node', node)
//     if (!node.uri) return
//     const slugs = node.uri.split('/').filter((slug) => slug !== '')
//     const parentSlug = slugs[0]
//     const childSlugs = slugs.splice(1, slugs.length - 1)
//     return { slugParent: parentSlug, slugChild: childSlugs ?? [] }
//   })
// }

// const metadataObject = (page: PostType | PageType) => {
//   const siteURL = process.env.SITE_URL
//
//   return {
//     title: page.seo.title,
//     description: page.seo.metaDesc,
//     locale: 'sv_SE',
//     alternates: {
//       canonical: process.env.SITE_URL + extractSlugFromUrl(page.seo.canonical),
//     },
//     openGraph: {
//       title: page.seo.title,
//       description: page.seo.metaDesc,
//       url: `${siteURL}${page.uri}`,
//       siteName: page.seo.opengraphSiteName,
//       images: [
//         {
//           url: page.seo.opengraphImage?.sourceUrl ?? '',
//           alt: page.seo.opengraphImage?.altText ?? '',
//           width: page.seo.opengraphImage?.mediaDetails.width ?? 1200,
//           height: page.seo.opengraphImage?.mediaDetails.height ?? 630,
//         },
//       ],
//     },
//   }
// }

// export async function generateMetadata(props: { params: Params }) {
//   const params = await props.params
//   const { slugParent, slugChild } = params
//   let pageUri = `/${slugParent}/`
//   if (Array.isArray(slugChild) && slugChild.length > 0) {
//     pageUri = `${pageUri}${slugChild.join('/')}/`
//   }
//   const page = await getNodeByUri({ uri: pageUri })
//   if (page?.__typename === 'Page') {
//     return metadataObject(page) as Metadata
//   }
//   const post = await getNodeByUri({ uri: slugParent })
//   if (post?.__typename === 'Post') {
//     return metadataObject(post) as Metadata
//   }
//   return notFound()
// }

export default async function Page(props: { params: Params }) {
  const params = await props.params
  const { slugParent, slugChild } = params
  let pageUri = `/${slugParent}/`
  if (Array.isArray(slugChild) && slugChild.length > 0) {
    pageUri = `${pageUri}${slugChild.join('/')}/`
  }
  const page = (await getPageBySlug({ slug: pageUri })) as PageType
  if (page?.__typename === 'Page') {
    return <SubPage page={page} />
  }
  const post = (await getPageBySlug({
    slug: slugParent,
  })) as PostType
  if (!post) {
    return notFound()
  }
  // const posts = await getPostPreviews({ count: 5 })
  // const similarPosts = post
  //   ? posts.edges.filter(({ node }) => node.id !== post.id).splice(0, 4)
  //   : null
  // if (post?.__typename === 'Post') {
  //   return <CasinoPage post={post} similarPosts={similarPosts} />
  // }
}
