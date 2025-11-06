import { notFound } from 'next/navigation'
import { getAffiliateLinkBySlug } from '@/src/lib/api'
import dynamicComponent from 'next/dynamic'
import { getStaticParams } from '@/src/lib/api'
import { AffLinkSchemaType } from '@/src/schemas/affLink'
const GoPage = dynamicComponent(() => import('@/src/app/GoPage'))

const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params
  const affLink = await getAffiliateLinkBySlug({
    slug: `/${params?.slug}`,
  })
  if (!affLink) {
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

export async function generateStaticParams() {
  const affLinks: AffLinkSchemaType[] = await getStaticParams('aff-links')

  return affLinks.map((page) => ({ slug: page.slug.current })) || []
}

export default Page
