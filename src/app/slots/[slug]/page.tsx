import {
  getSlotPageBySlug,
  getStaticParams,
  getSimilarSlotPages,
} from '@/src/lib/api'
import { notFound } from 'next/navigation'
import SlotPage from '@/src/app/SlotPage'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'
import { formatSlug } from '@/src/lib/utils'
import { Metadata } from 'next'

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params
  const slotPage: SlotPageSchemaType = await getSlotPageBySlug({
    slug: `/slots${formatSlug(params?.slug)}`,
  })
  const siteURL = (process.env.NEXT_PUBLIC_SITE_URL as string) + slotPage.slug.current
  const metadata: Metadata = {
    title: slotPage.seoTitle,
    description: slotPage.seoDescription,
    alternates: {
      canonical: slotPage.canonical,
    },
    openGraph: {
      title: slotPage.seoTitle,
      description: slotPage.seoDescription,
      url: siteURL,
      locale: 'sv_SE',
      siteName: 'Casinogringos',
      type: slotPage.opengraphType ?? 'website',
      images: [
        {
          url: slotPage.featuredImage.src,
          alt: slotPage.featuredImage.alt,
          width: 1200,
          height: 630,
        },
      ],
    },
  }

  return metadata
}

export default async function Page(props: { params: Params }) {
  const params = await props.params
  const slotPage: SlotPageSchemaType = await getSlotPageBySlug({
    slug: `/slots${formatSlug(params?.slug)}`,
  })
  if (!slotPage || !slotPage.slot) return notFound()
  const similarSlotPages = await getSimilarSlotPages({
    slug: slotPage.slug.current,
    count: 4,
  })

  return <SlotPage slotPage={slotPage} similarSlotPages={similarSlotPages} />
}

export async function generateStaticParams() {
  const allSlotPages: SlotPageSchemaType[] = await getStaticParams('slot-pages')
  return allSlotPages.map((page) => {
    const slug = page.slug.current.replace('/slots/', '')
    return { slug }
  })
}
