import GuideIndex from '@/src/app/GuideIndex'
import Pagination from '@/src/components/organisms/Pagination'
import { getGuidePageCount, getGuidePagePreviews } from '@/src/lib/api'

export default async function Page(props: {
  params: Promise<{ page: string }>
}) {
  const params = await props.params
  const pageNumber = parseInt(params.page)
  const offset = (pageNumber - 1) * 24
  const guides = await getGuidePagePreviews({ count: 24, offset })
  const guidesCount = await getGuidePageCount()
  const breadcrumbItems = [
    {},
    {
      text: 'Guider',
      url: `${process.env.SITE_URL}/guider/page/${pageNumber}`,
    },
  ]

  return (
    <>
      {/*<BreadCrumbs items={breadcrumbItems} />*/}
      <GuideIndex guidePages={guides} />
      <Pagination
        currentPage={pageNumber}
        numPages={Math.ceil(guidesCount / 24)}
        pathPrefix={'guider'}
      />
    </>
  )
}
//
// export async function generateStaticParams() {
//   const guides = await getStaticParams("guide");
//   const guidesCount = guides.length;
//   const pagesCount = Math.ceil(guidesCount / 24);
//
//   return Array.from({ length: pagesCount }).map((_, i) => ({
//     page: `${i + 1}`,
//   }));
// }
