import { FlamingoCasinoBlock } from '@/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
const AffiliateButton = dynamic(
  () => import('../../../sin-bin/AffiliateButton')
)

const CasinoBox = ({ block }: { block: FlamingoCasinoBlock }) => {
  const { casino, buttonText, offer, description } = block
  const brandDescription = description?.split('\n').join('<br>') ?? ''
  return (
    <div
      className={
        'grid grid-cols-1 md:grid-cols-[100px,1fr] bg-slate100 rounded-lg lg:px-6 px-5 py-6 mb-4 lg:mb-6 lg:py-9 gap-6'
      }
    >
      <div className={'flex md:block lg:justify-center'}>
        <Image
          src={casino.logoUrl}
          alt={`${casino.brandName} Logo`}
          width={100}
          height={100}
          quality={50}
          className={'rounded-full'}
        />
      </div>
      <div>
        <h3 className={'!mb-0 !mt-0 text-2xl'}>{casino.brandName}</h3>
        <span className={'block pb-0 pt-2 font-bold leading-6 text-dark'}>
          {offer}
        </span>
        <div
          dangerouslySetInnerHTML={{
            __html: brandDescription,
          }}
          className={'prose mb-6 mt-3'}
        />
        <AffiliateButton
          affiliateLink={`go/${casino.trackerSlug}`}
          place="CasinoCard block"
          title={buttonText}
        >
          {buttonText}
        </AffiliateButton>
      </div>
    </div>
  )
}

export default CasinoBox
