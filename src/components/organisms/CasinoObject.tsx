import { CasinoObject as CasinoObjectType } from '@/src/types'
import Image from 'next/image'
import Link from '@/src/components/atoms/Link'
import { PortableText } from 'next-sanity'
import Placeholder from '@/src/components/atoms/Placeholder'

const CasinoObject = ({ object }: { object: CasinoObjectType }) => {
  const { casino, buttonText, offer, description } = object

  if (!casino) {
    return <Placeholder message={'Casino Object: Missing casino'} />
  }
  return (
    <div
      className={
        'grid grid-cols-1 md:grid-cols-[100px,1fr] bg-slate100 rounded-lg lg:px-6 px-5 py-6 mb-4 lg:mb-6 lg:py-9 gap-6'
      }
    >
      <div className={'flex md:block lg:justify-center'}>
        <Image
          src={casino.logo.src}
          alt={casino.logo.altText}
          width={100}
          height={100}
          quality={50}
          className={'rounded-full'}
        />
      </div>
      <div>
        <h3 className={'!mb-0 !mt-0 text-2xl'}>{casino.name}</h3>
        <span className={'block pb-0 pt-2 font-bold leading-6 text-dark'}>
          <PortableText value={offer} />
        </span>
        <div className={'prose mb-6 mt-3'}>
          <PortableText value={description} />
        </div>
        <Link href={`go/${casino.slug.current}`} place="CasinoCard block">
          {buttonText}
        </Link>
      </div>
    </div>
  )
}

export default CasinoObject
