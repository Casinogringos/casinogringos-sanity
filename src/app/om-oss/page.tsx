import { getPageBySlug, getAllAuthorPreviews } from '@/src/lib/api'
import { Metadata } from 'next'
import { SubPageSchemaType } from '@/src/schemas'
import AuthorIndex from '@/src/app/AuthorIndex'

export async function generateMetadata() {
  const page = (await getPageBySlug({
    slug: '/om-oss',
  })) as SubPageSchemaType
  const siteURL = process.env.SITE_URL
  const metadata: Metadata = {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: {
      canonical: page.canonical,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      url: `${siteURL}/${page.slug.current}`,
      locale: 'sv_SE',
      siteName: 'Casinogringos',
      type: page.opengraphType,
      images: [
        {
          url: page.seoImage?.src ?? '',
          alt: page.seoImage?.alt ?? '',
          width: 1200,
          height: 630,
        },
      ],
    },
  }

  return metadata as Metadata
}

const Page = async () => {
  const page = await getPageBySlug({
    slug: '/om-oss',
  })
  const authors = await getAllAuthorPreviews()

  return <AuthorIndex page={page} authors={authors} />
}

export default Page

