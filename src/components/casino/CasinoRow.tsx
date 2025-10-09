import Link from '@/src/components/content/Link'
import Image from 'next/image'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import { CasinoPagePreviewSchemaType } from '@/src/schemas/casinoPagePreview'
import CasinoService from '@/src/services/CasinoService'

const casinoService = new CasinoService()

const CasinoRow = ({
  casinoPage,
  pathname,
}: {
  casinoPage: CasinoPageSchemaType | CasinoPagePreviewSchemaType
  pathname: string
}) => {
  const { casino: casinoData } = casinoPage

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
          <span className="text-xs font-medium text-slate-900 block">
            {casinoData.name}
          </span>
          <span className="block text-sm font-bold">
            {casinoService.getBonusString(casinoPage)}
          </span>
        </div>
        {casinoPage.affLinks?.[0] && <Link
          href={`/go${casinoPage.affLinks?.[0].slug.current}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          prefetch={false}
          variant={'affiliate'}
          size="sm"
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
          <span className="whitespace-nowrap">Besök</span>
        </Link>}
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
