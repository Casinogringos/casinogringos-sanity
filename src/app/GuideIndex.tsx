import GuideService from '@/src/services/GuideService'
const guideService = new GuideService()
import Container from '@/src/components/atoms/Container'
import Heading from '@/src/components/atoms/Heading'
import { GuidePagePreviewSchemaType, SubPageSchemaType } from '@/src/schemas'
import GuideCard from '@/src/components/molecules/GuideCard'
import { PortableText } from 'next-sanity'

const GuideIndex = ({
  page,
  guidePages,
}: {
  page: SubPageSchemaType
  guidePages: GuidePagePreviewSchemaType[]
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
    <Container className="py-6 lg:py-12">
      <Heading level={1} className="text-3xl font-bold" text={page.title} />
      <PortableText value={page.intro} />
      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
        {guidePages.map((guide) => (
          <GuideCard key={`guide-${guide._id}`} item={guide} />
        ))}
      </div>
    </Container>
  )
}

export default GuideIndex
