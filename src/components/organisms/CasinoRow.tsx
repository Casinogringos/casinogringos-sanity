import Link from '@/src/components/atoms/Link'
import Image from 'next/image'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import { CasinoPagePreviewSchemaType } from '@/src/schemas/casinoPagePreview'

const CasinoRow = ({
  casino,
  pathname,
}: {
  casino: CasinoPageSchemaType | CasinoPagePreviewSchemaType
  pathname: string
}) => {
  const { casino: casinoData } = casino

  return (
    <>
      <div className="mt-2 flex w-full items-center rounded-md border border-blue-100 bg-slate-100 px-3 py-2.5">
        <Image
          src={casinoData.logo.src}
          alt={casinoData.logo.altText}
          width={45}
          height={45}
          className="mr-3 rounded-full"
        />
        <div>
          <span className="text-xs font-medium text-slate-900">
            {casinoData.name}
          </span>
        </div>
        <Link
          href={`/go/${casino.slug.current}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          prefetch={false}
          variant={'affiliate'}
          className="ml-auto"
          plausible={{
            eventName: 'AffiliateClick',
            props: {
              buttonId: casinoData.name,
              place: 'Sidebar',
              pathname: pathname,
            },
          }}
        >
          Besök
        </Link>
      </div>
      <div className="rounded-b-md bg-white pt-1 text-center text-xs text-gray-400 lg:text-left">
        18+ | Spela ansvarsfullt |{' '}
        <Link
          prefetch={false}
          rel="nofollow noreferrer noopener"
          href="https://stodlinjen.se/"
          target="_blank"
        >
          Stödlinjen.se
        </Link>{' '}
        |{' '}
        <Link
          prefetch={false}
          rel="nofollow noreferrer noopener"
          href="https://www.spelpaus.se/"
          target="_blank"
        >
          Spelpaus
        </Link>{' '}
        | Regler och villkor gäller
      </div>
    </>
  )
}

export default CasinoRow
