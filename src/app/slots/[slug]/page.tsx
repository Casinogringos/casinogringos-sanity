import { getSlotPageBySlug, getStaticParams, getSimilarSlotPages, getCasinoPagesByCasinos } from '@/src/lib/api'
import { notFound } from 'next/navigation'
import SlotPage from '@/src/app/SlotPage'
import { CasinoPageSchemaType, SlotPageSchemaType, CasinoSchemaType } from '@/src/schemas'
import { formatPageSlug } from '@/src/lib/utility'
import { Metadata } from 'next'
import { urlFor } from '@/src/lib/client'

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const slotPage: SlotPageSchemaType = (await getSlotPageBySlug({
    slug: `/slots${formatPageSlug(params?.slug)}`,
  }))
  const siteURL = (process.env.SITE_URL as string) + slotPage.slug.current;
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
      locale: "sv_SE",
      siteName: 'Casinogringos',
      type: slotPage.opengraphType,
      images: [
        {
          url: urlFor(slotPage.featuredImage.image).url(),
          alt: slotPage.featuredImage.image.alt,
          width: slotPage.featuredImage.image.asset?.metadata?.dimensions?.width ?? 1200,
          height: slotPage.featuredImage.image.asset?.metadata?.dimensions?.height ?? 630,
        },
      ],
    },
  };

  return metadata
}

export default async function Page(props: { params: Params }) {
  const params = await props.params
  const slotPage: SlotPageSchemaType = (await getSlotPageBySlug({
    slug: `/slots${formatPageSlug(params?.slug)}`,
  }))
  const similarSlotPages = await getSimilarSlotPages({
    id: slotPage._id,
    count: 5,
  })
  const casinoPages: CasinoPageSchemaType[] = await getCasinoPagesByCasinos({ casinoIds: slotPage.slot.casinos.map((casino: CasinoSchemaType) => casino._id) })

  if (slotPage) {
    return <SlotPage slotPage={slotPage} similarSlotPages={similarSlotPages} casinoPages={casinoPages} />
  } else return notFound()
}

export async function generateStaticParams() {
  const allSlotPages: SlotPageSchemaType[] = await getStaticParams('slot-pages')

  return allSlotPages.map((page) => ({ slug: page.slug.current }))
}
