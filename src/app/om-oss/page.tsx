import { getAllAuthorPreviews, getNodeByUri } from '@/lib/api'
import About from '@/src/app/AboutIndex'
import { extractSlugFromUrl } from '@/lib/helpers'
import { Metadata } from 'next'
import { Page as PageType } from '@/types/index'

export async function generateMetadata() {
  const item = (await getNodeByUri({
    uri: '/om-oss',
  })) as PageType
  const siteURL = process.env.SITE_URL
  const metadata = {
    title: item.seo.title ?? item.title,
    description: item.seo.metaDesc,
    alternates: {
      canonical: process.env.SITE_URL + extractSlugFromUrl(item.seo.canonical),
    },
    openGraph: {
      title: item.title,
      description: item.seo.metaDesc,
      url: `${siteURL}/${item.slug}`,
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

import { getPageBySlug } from '@/src/lib/api'
import AuthorIndex from '@/src/app/AuthorIndex'

const Page = async () => {
  const page = await getPageBySlug({
    slug: '/om-oss',
  })
  const authors = await getAllAuthorPreviews()

  return <AuthorIndex page={page} authors={authors} />
}

export default Page

