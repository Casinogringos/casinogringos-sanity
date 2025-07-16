import { notFound } from 'next/navigation'
import { getCasinoPageBySlug } from '@/src/lib/api'
import dynamicComponent from 'next/dynamic'
import { getStaticParams } from '@/src/lib/api'
import { CasinoPageSchemaType } from '@/src/schemas'
const GoPage = dynamicComponent(() => import('@/src/app/GoPage'))

const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params
  const casinoPage = await getCasinoPageBySlug({
    slug: params.slug,
  })
  if (!casinoPage.affiliateLink) {
    return notFound()
  }

  return <GoPage casinoPage={casinoPage} />
}

export const metadata = {
  robots: {
    index: false,
    nocache: true,
  },
}

export async function generateStaticParams() {
  const casinoPages: CasinoPageSchemaType[] =
    await getStaticParams('casino-pages')

  return (
    casinoPages
      .filter((page) => page.affiliateLink)
      .map((page) => ({ slug: page.slug.current })) || []
  )
}

export default Page
