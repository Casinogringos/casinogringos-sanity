import { notFound } from 'next/navigation'
import { getAffiliateLinkBySlug } from '@/src/lib/api'
import dynamicComponent from 'next/dynamic'
import { getStaticParams } from '@/src/lib/api'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
const GoPage = dynamicComponent(() => import('@/src/app/GoPage'))

const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params
  const affLink = await getAffiliateLinkBySlug({
    slug: `/${params?.slug}`,
  })
  console.log('affLink', affLink)
  if (!affLink.link) {
    return notFound()
  }

  return <GoPage affLink={affLink} />
}

export const metadata = {
  robots: {
    index: false,
    nocache: true,
  },
}

// export async function generateStaticParams() {
//   const affLinks: CasinoPageSchemaType[] =
//     await getStaticParams('casino-pages')

//   return (
//     casinoPages
//       .filter((page) => page.affiliateLink)
//       .map((page) => ({ slug: page.slug.current })) || []
//   )
// }

export default Page
