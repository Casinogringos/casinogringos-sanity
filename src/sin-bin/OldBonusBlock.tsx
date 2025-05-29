import List from '@/components/List'
import { FlamingoBonusBlockOld } from '@/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
const Paragraph = dynamic(() => import('@/components/Paragraph'))
const AffiliateButton = dynamic(() => import('@/components/AffiliateButton'))

const BonusBlock = ({
  block,
  className,
}: {
  block: FlamingoBonusBlockOld
  className?: string
}) => {
  const { attributes } = block
  let featuredImage
  try {
    featuredImage = new URL(attributes.featuredImage).pathname
  } catch (e) {
    console.log(e)
    featuredImage = attributes.featuredImage
  }

  return (
    <section
      className={`${className} bg-darklight p-8 pb-4 rounded-md flex flex-col items-center justify-center not-prose`}
    >
      <Image
        src={`${process.env.WORDPRESS_BASE_URL}${featuredImage}`}
        alt={`${attributes.title} Image`}
        width={100}
        height={100}
        className={'mb-4 rounded-full border-2 border-white'}
      />
      <div className="mx-auto mb-3 max-w-md text-center">
        <span className={'text-2xl text-white'}>{attributes.title}</span>
      </div>
      <List
        className={'mb-5 text-slate200'}
        type={'html'}
        items={attributes.information.split('\n')}
      />
      <AffiliateButton
        affiliateLink={`${attributes.trackerUrl}`}
        place="Bonus block"
        title={attributes.buttonText}
        flex={false}
        className={'w-full'}
      >
        {attributes.buttonText}
      </AffiliateButton>
      {attributes.terms !== '' && (
        <Paragraph
          className={'mt-3 text-xs2 text-white'}
          content={attributes.terms}
        />
      )}
    </section>
  )
}

export default BonusBlock
