import { CasinoObjectSchemaType } from '@/src/schemas/casinoObject'
import Image from 'next/image'
import Link from '@/src/components/atoms/Link'
import { PortableText } from 'next-sanity'
import Placeholder from '@/src/components/atoms/Placeholder'
import Heading from '@/src/components/atoms/Heading'

const CasinoObject = ({ object }: { object: CasinoObjectSchemaType }) => {
  const { casino, buttonText, offer, description } = object

  if (!casino) {
    return <Placeholder message={'Casino Object: Missing casino'} />
  }
  return (
    <div
      className={
        'grid grid-cols-1 md:grid-cols-[100px_1fr] bg-slate-100 rounded-lg lg:px-6 px-5 py-6 mb-4 lg:mb-6 lg:py-9 gap-6'
      }
    >
      <div className={'flex lg:justify-start lg:items-start not-prose'}>
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
        <Heading level={2} text={casino.name} className={'not-prose !mt-0 !mb-2'} />
        <span className={'block pb-0 not-prose font-bold leading-6 text-dark'}>
          <PortableText value={offer} />
        </span>
        <div className={'prose mb-6 mt-3'}>
          <PortableText value={description} />
        </div>
        <Link variant='affiliate' className='w-full' href={`go/${casino.slug.current}`} place="CasinoCard block">
          {buttonText}
        </Link>
      </div>
    </div>
  )
}

export default CasinoObject
