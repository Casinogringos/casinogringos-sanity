import GuideIndex from '@/src/app/GuideIndex'
import {
  getGuidePageCount,
  getGuidePagePreviews,
  getPageBySlug,
  getStaticParams,
} from '@/src/lib/api'

export default async function Page(props: {
  params: Promise<{ page: string }>
}) {
  const params = await props.params
  const pageNumber = parseInt(params.page)
  const offset = (pageNumber - 1) * 24
  const guides = await getGuidePagePreviews({ count: 24, offset })
  const guidesCount = await getGuidePageCount()
  const page = await getPageBySlug({ slug: '/guider' })

  return <GuideIndex guidePages={guides} page={page} pageCount={Math.ceil(guidesCount / 24)} currentPage={pageNumber} />
}

export async function generateStaticParams() {
  const guidePages = await getStaticParams('guide-pages')
  const guidesCount = guidePages.length
  const pagesCount = Math.ceil(guidesCount / 24)

  return Array.from({ length: pagesCount }).map((_, i) => ({
    page: `${i + 1}`,
  }))
}
