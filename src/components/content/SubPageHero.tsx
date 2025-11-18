import Heading from '@/src/components/content/Heading'
import Container from '@/src/components/layout/Container'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { PortableText } from 'next-sanity'
import dynamic from 'next/dynamic'
const HeroAvatar = dynamic(() => import('@/src/components/content/HeroAvatar'))

const SubPageHero = ({
  page,
  modifiedAt,
  createdAt,
}: {
  page: SubPageSchemaType
  modifiedAt: number | null
  createdAt: number | null
}) => {
  const { title } = page

  return (
    <div className="relative bg-darklight">
      <Container>
        <div className="py-6 lg:pt-12 lg:pb-14 text-white">
          <Heading
            className="font-bold leading-none mb-4 lg:text-4xl"
            text={title}
            level={1}
            sizes={[7, 7, 8]}
          />
          <div className="text-slate-200 lg:max-w-4xl">
            <PortableText value={page.intro} />
          </div>
          {page.author && (
            <div className="mt-6">
              <HeroAvatar
                author={page.author}
                createdAt={createdAt}
                modifiedAt={modifiedAt}
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
