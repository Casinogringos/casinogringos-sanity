import GuidePage from '@/src/app/GuidePage'
import {
  getGuidePageBySlug,
  getSimilarGuidePages,
  getStaticParams,
} from '@/src/lib/api'
import { formatSlug } from '@/src/lib/utils'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params
  const guidePage = await getGuidePageBySlug({
    slug: `/guider${formatSlug(params?.slug)}`,
  })
  const siteURL =
    (process.env.NEXT_PUBLIC_SITE_URL as string) + guidePage.slug.current

  const metadata: Metadata = {
    title: guidePage.seoTitle,
    description: guidePage.seoDescription,
    alternates: {
      canonical: guidePage.canonical ?? new URL(siteURL),
    },
    openGraph: {
      title: guidePage.seoTitle,
      description: guidePage.seoDescription,
      url: siteURL,
      locale: 'sv_SE',
      siteName: 'Casinogringos',
      type: guidePage.opengraphType ?? 'website',
      images: [
        {
          url: guidePage.seoImage.url,
          alt: guidePage.seoImage.alt,
          width: 1200,
          height: 630,
        },
      ],
    },
  }

  return metadata
}

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const guidePage = await getGuidePageBySlug({
    slug: `/guider${formatSlug(params?.slug)}`,
  })
  if (!guidePage) return notFound()
  const similarGuidePages = await getSimilarGuidePages({
    slug: guidePage.slug.current,
    count: 4,
  })

  return <GuidePage page={guidePage} similarGuidePages={similarGuidePages} />
}

export async function generateStaticParams() {
  const allGuidesPages: GuidePageSchemaType[] =
    await getStaticParams('guide-pages')

  return allGuidesPages.map((page) => ({
    slug: page.slug.current.replace('/guider/', ''),
  }))
}
