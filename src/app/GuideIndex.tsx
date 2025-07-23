import GuideService from '@/src/services/GuideService'
const guideService = new GuideService()
import Container from '@/src/components/atoms/Container'
import Heading from '@/src/components/atoms/Heading'
import Breadcrumbs from '@/src/components/organisms/BreadCrumbs'
import {
  BreadcrumbsSchemaType,
  GuidePagePreviewSchemaType,
  SubPageSchemaType,
} from '@/src/schemas'
import ArticleCard from '@/src/components/molecules/ArticleCard'
import { PortableText } from 'next-sanity'

const GuideIndex = ({
  page,
  guidePages,
  breadcrumbs,
}: {
  page: SubPageSchemaType
  guidePages: GuidePagePreviewSchemaType[]
  breadcrumbs: BreadcrumbsSchemaType
}) => {
  const isValid = () => {
    if (!guideService.validateGuidesList(guidePages, true)) {
      return false
    }
    return true
  }
  if (!isValid()) {
    return null
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <Container className="py-6 lg:py-12">
        <Heading level={1} className="text-3xl font-bold" text={page.title} />
        <PortableText value={page.intro} />
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
          {guidePages.map((guide) => (
            <ArticleCard key={`guide-${guide._id}`} item={guide} />
          ))}
        </div>
      </Container>
    </>
  )
}

export default GuideIndex
