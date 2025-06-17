import List from '@/src/components/molecules/List'
import { BonusObject } from '@/src/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
const Paragraph = dynamic(() => import('@/src/components/atoms/Paragraph'))
const Button = dynamic(() => import('@/src/components/atoms/Button'))

const BonusBox = ({
  block,
  className,
}: {
  block: BonusObject
  className?: string
}) => {
  const bonus = block.title ? block.title : (block.casino.bonus ?? '')
  const freespins = bonus ? '' : block.casino.freespins

  return (
    <section
      className={`${className} bg-darklight p-8 pb-4 rounded-md flex flex-col items-center justify-center not-prose`}
    >
      <Image
        src={block.casino.logoUrl}
        alt={block.casino.brandName}
        width={100}
        height={100}
        className={'mb-4 rounded-full border-2 border-white'}
      />
      {bonus && (
        <div className="mx-auto mb-3 max-w-md text-center">
          <span className={'text-2xl text-white'}>{bonus} kr bonus</span>
        </div>
      )}
      {freespins && (
        <div className="mx-auto mb-3 max-w-md text-center">
          <span className={'text-2xl text-white'}>{freespins} freespins</span>
        </div>
      )}
      <List
        className={'mb-5 text-slate200'}
        type={'strings'}
        items={block.information}
      />
      <Button
        affiliateLink={`go/${block.casino.trackerSlug}`}
        place="BonusBox block"
        title={block.buttonText}
        flex={false}
        className={'w-full'}
      >
        {block.buttonText}
      </Button>
      {block.terms !== '' && (
        <Paragraph
          className={'mt-3 text-xs2 text-white'}
          content={block.terms}
        />
      )}
    </section>
  )
}

export default BonusBox
