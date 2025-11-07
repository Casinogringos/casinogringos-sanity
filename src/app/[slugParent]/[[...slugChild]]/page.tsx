import SubPage from '@/src/app/SubPage'
import { notFound } from 'next/navigation'
import CasinoPage from '@/src/app/CasinoPage'
import { Metadata } from 'next'
import {
  getCasinoPageBySlug,
  getPageBySlug,
  getSimilarCasinoPages,
  getStaticParams,
} from '@/src/lib/api'
import { formatSlug } from '@/src/lib/utils'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'

type Params = Promise<{
  slugParent: string
  slugChild: string[]
}>

export async function generateStaticParams() {
  const allPages: SubPageSchemaType[] = await getStaticParams('pages')
  const allCasinoPages: CasinoPageSchemaType[] =
    await getStaticParams('casino-pages')
  const allParams = [
    ...allPages.filter((page) => {
      return (
        page.slug.current !== '/' &&
        page.slug.current !== '/guider' &&
        page.slug.current !== '/nyheter' &&
        page.slug.current !== '/slots' &&
        page.slug.current !== '/om-oss'
      )
    }),
    ...allCasinoPages,
  ]

  return allParams.map((param) => {
    if (!param.slug?.current) return
    const slugs = param.slug.current.split('/').filter((slug) => slug !== '')
    const parentSlug = slugs[0]
    const childSlugs = slugs.splice(1, slugs.length - 1)
    return { slugParent: parentSlug, slugChild: childSlugs ?? [] }
  })
}

const metadataObject = (
  page: CasinoPageSchemaType | SubPageSchemaType
): Metadata & { locale: string } => {
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    locale: 'sv_SE',
    alternates: {
      canonical: page.canonical ? new URL(page.canonical) : undefined,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      url: new URL(`${siteURL}${page.slug.current}`),
      siteName: 'Casinogringos',
      images: [
        {
          url: page.seoImage?.src ?? '',
          alt: page.seoImage?.alt ?? '',
          width: 600,
          height: 400,
        },
      ],
    },
  }
}

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params
  const { slugParent, slugChild } = params
  let pageUri = `/${slugParent}/`
  if (Array.isArray(slugChild) && slugChild.length > 0) {
    pageUri = `${pageUri}${slugChild.join('/')}/`
  }
  const page: SubPageSchemaType = await getPageBySlug({
    slug: formatSlug(pageUri),
  })
  if (page?._type === 'pages') {
    return metadataObject(page)
  }
  const casinoPage: CasinoPageSchemaType = await getCasinoPageBySlug({
    slug: formatSlug(slugParent),
  })
  if (casinoPage?._type === 'casino-pages') {
    return metadataObject(casinoPage)
  }
  return notFound()
}

export default async function Page(props: { params: Params }) {
  const params = await props.params
  const { slugParent, slugChild } = params
  let pageUri = `/${slugParent}/`
  if (Array.isArray(slugChild) && slugChild.length > 0) {
    pageUri = `${pageUri}${slugChild.join('/')}/`
  }
  const page: SubPageSchemaType = await getPageBySlug({
    slug: formatSlug(pageUri),
  })
  console.log('PAGE', page)
  if (page?._type === 'pages') {
    return <SubPage page={page} />
  }
  const casinoPage: CasinoPageSchemaType = await getCasinoPageBySlug({
    slug: formatSlug(slugParent),
  })
  if (!casinoPage) {
    return notFound()
  }
  const similarCasinoPages: CasinoPageSchemaType[] =
    await getSimilarCasinoPages({
      id: casinoPage._id,
      count: 4,
    })
  if (casinoPage?._type === 'casino-pages') {
    return (
      <CasinoPage
        casinoPage={casinoPage}
        similarCasinoPages={similarCasinoPages}
      />
    )
  }
}
