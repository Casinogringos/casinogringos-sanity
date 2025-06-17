// import Date from '../../../casinogringos-v3/src/components/Date'
// import Link from 'next/link'
// import Container from '../../../casinogringos-v3/src/components/Container'
// import ImageComponent from '../../../casinogringos-v3/src/components/ImageComponent'
//
import { GuidePage } from '@/src/types'
import Container from '@/src/components/atoms/Container'
import Heading from '@/src/components/atoms/Heading'
import Link from '@/src/components/atoms/Link'

const GuidesIndex = ({ guides }: { guides: GuidePage<false>[] }) => {
  if (!guides) {
    return null
  }
  console.log('guides', guides)
  return (
    <Container className="py-6 lg:py-12">
      <Heading level={1} className="text-3xl font-bold">
        <span>Guider</span>
      </Heading>
      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
        {guides.map((guide) => (
          <div key={`guide-${guide._id}`} className="flex flex-col items-start">
            {/*<div className="relative flex h-24 w-full overflow-hidden rounded-md lg:h-44">*/}
            {/*  <SanityImage*/}
            {/*    image={guide?.node?.featuredImage?.node}*/}
            {/*    altText={guide.featuredImag}*/}
            {/*  />*/}
            {/*</div>*/}
            {/*<div className="mt-3 flex items-center gap-x-4 text-xs">*/}
            {/*  <time dateTime={guide.node.date} className="text-gray500">*/}
            {/*    <Date dateString={guide.node.date} />*/}
            {/*  </time>*/}
            {/*</div>*/}
            <Link href={guide.slug.current} prefetch={false}>
              <h3 className="text-gray-900 group-hover:text-gray-600 mt-1 text-lg font-semibold leading-6">
                {guide.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default GuidesIndex
