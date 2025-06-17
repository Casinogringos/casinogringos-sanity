import Container from '@/src/components/atoms/Container'
import dynamic from 'next/dynamic'
import { Author, SubPage } from '@/src/types'
import { PortableText } from 'next-sanity'
import Heading from '@/src/components/atoms/Heading'
const HeroAvatar = dynamic(() => import('../organisms/HeroAvatar'))

const PageHero = ({ page }: { page: SubPage<true> }) => {
  const { title } = page

  return (
    <div className="relative bg-dark">
      <Container>
        <div className="py-6 lg:pt-12 lg:pb-14 text-white">
          <Heading
            className="text-3xl lg:text-4xl max-w-xl font-bold leading-none"
            text={title}
            level={1}
          />
          <PortableText value={page.intro} />
          {/*{author && (*/}
          {/*  <div className="mt-6">*/}
          {/*    <HeroAvatar*/}
          {/*      author={author}*/}
          {/*      date={date}*/}
          {/*      modified={modified}*/}
          {/*      shareTitle={shareTitle}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </Container>
    </div>
  )
}

export default PageHero
