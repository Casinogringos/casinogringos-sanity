import {
  getGuidePageBySlug,
  getSimilarGuidePages,
  getStaticParams,
} from '@/src/lib/api'
import { notFound } from 'next/navigation'
import { formatPageSlug } from '@/src/lib/utility'
import GuidePage from '@/src/app/GuidePage'
import { Metadata } from 'next'
import { GuidePageSchemaType } from '@/src/schemas'
import { urlFor } from '@/src/lib/client'

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params
  const guidePage: GuidePageSchemaType = (await getGuidePageBySlug({
    slug: params.slug,
  })) as Guide
  const siteURL = (process.env.SITE_URL as string) + guidePage.slug.current
  const metadata: Metadata = {
    title: guidePage.seoTitle,
    description: guidePage.seoDescription,
    alternates: {
      canonical: guidePage.canonical,
    },
    openGraph: {
      title: guidePage.seoTitle,
      description: guidePage.seoDescription,
      url: siteURL,
      locale: 'sv_SE',
      siteName: 'Casinogringos',
      type: guidePage.opengraphType,
      images: [
        {
          url: urlFor(guidePage.seoImage).url(),
          alt: guidePage.seoImage.alt,
          width: guidePage.seoImage.asset?.metadata.dimensions.width ?? 1200,
          height: guidePage.seoImage.asset?.metadata.dimensions.height ?? 630,
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
  const guidePage = (await getGuidePageBySlug({
    slug: `/guider${formatPageSlug(params?.slug)}`,
  })) as Guide
  if (!guidePage) return notFound()
  const similarGuidePages = await getSimilarGuidePages({
    id: guidePage.id,
    count: 5,
  })

  return <GuidePage page={guidePage} similarGuidePages={similarGuidePages} />
}

export async function generateStaticParams() {
  const allGuidesPages: GuidePageSchemaType[] =
    await getStaticParams('guide-pages')

  return allGuidesPages.map((page) => ({ slug: page.slug.current }))
}
