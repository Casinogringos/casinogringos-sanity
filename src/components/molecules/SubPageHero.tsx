import Container from '@/src/components/atoms/Container'
import dynamic from 'next/dynamic'
import { PortableText } from 'next-sanity'
import Heading from '@/src/components/atoms/Heading'
import { SubPageSchemaType } from '@/src/schemas/subPage'
const HeroAvatar = dynamic(
  () => import('@/src/components/organisms/HeroAvatar')
)

const SubPageHero = ({ page }: { page: SubPageSchemaType }) => {
  const { title } = page

  return (
    <div className="relative bg-dark">
      <Container>
        <div className="py-6 lg:pt-12 lg:pb-14 text-white">
          <Heading
            className="font-bold leading-none mb-4"
            text={title}
            level={1}
            size={8}
          />
          <PortableText value={page.intro} />
          {page.author && (
            <div className="mt-6">
              <HeroAvatar
                author={page.author}
                date={page.originalPublishedAt ?? page._createdAt}
                modified={page._updatedAt ?? page.originalModifiedAt}
                shareTitle={page.seoTitle}
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default SubPageHero
