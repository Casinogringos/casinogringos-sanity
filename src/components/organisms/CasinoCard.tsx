import Star from '@/src/components/icons/StarIcon'
import CasinoService from '@/src/services/CasinoPageService'
import Image from 'next/image'
import Link from '@/src/components/atoms/Link'
import CheckBadgeIcon from '@/src/components/icons/CheckBadgeIcon'
import Paragraph from '@/src/components/atoms/Paragraph'
import { CasinoPagePreviewSchemaType, CasinoSchemaType } from '@/src/schemas'

const CasinoCard = ({ casino, index }: { casino: CasinoSchemaType; index: number }) => {
  const casinoService = new CasinoService()
  const { finalRating } = casinoService.getCasinoRatings({ casino })

  return (
    <div>
      <div className="rounded-t-md border-b border-b-gray-100 bg-white p-3.5 shadow-2xl">
        <div className="flex flex-col gap-x-8 gap-y-2">
          <div
            className="relative h-28 flex-col items-center overflow-hidden rounded-md p-4"
            style={{ background: casino.brandColor ?? '' }}
          >
            <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-br-md bg-slate-200/20 text-sm font-medium text-slate-100">
              {index + 1}
            </span>
            <div className="-mb-4 -mt-1.5 flex h-full w-full items-center justify-center">
              <Image
                src={casino.logo.src}
                alt={casino.logo.altText}
                width={288}
                height={288}
                className={'h-36 w-36'}
              />
            </div>
            <div className="my-1.5 flex w-full items-center justify-between text-xs text-white">
              <div>{casino.name}</div>
              {finalRating && (
                <div className="ml-auto flex items-center justify-center rounded-full bg-black/40 px-2 text-sm">
                  {finalRating}
                  <Star className="-mt-0.5 ml-1 h-3.5 w-3.5 text-yellow400" />
                </div>
              )}
            </div>
          </div>
          <div className="block text-sm font-bold uppercase text-black">
            <div className="grid grid-cols-2 gap-2">
              {casino.casinoBonuses?.length && (
                <div className="flex min-h-[84px] flex-col items-center justify-center rounded-md border border-green-200 bg-green-100 p-2 text-lg leading-6">
                  <div className="-mb-1 block text-xs text-gray-700">Bonus</div>
                  {casino.casinoBonuses[0]
                    ? casino.casinoBonuses[0].bonusAmountRange[1] + ' kr'
                    : '-'}
                  {casino?.casinoBonuses?.[0]?.wageringRequirements && (
                    <div className="-mt-0.5 flex items-center text-xs font-medium text-gray-700">
                      Omsättning:
                      <span className="ml-0.5 inline-block text-black">
                        {casino.casinoBonuses[0].wageringRequirements}x{' '}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {casino.freeSpins?.length && (
                <div className="flex min-h-[84px] flex-col items-center justify-center rounded-md border border-blue-100 bg-blue-50 p-2 text-lg leading-6">
                  <div className="-mb-1 block text-xs text-gray-700">
                    Freespins
                  </div>
                  {casino.freeSpins?.[0].numberOfFreeSpins ?? '-'}{' '}
                  {casino?.freeSpins.length && (
                    <div className="-mt-0.5 flex items-center text-xs font-medium text-gray-700">
                      Omsättning:{' '}
                      <span className="ml-0.5 inline-block text-black">
                        {casino.freeSpins?.[0].wageringRequirements}x
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
            {!casino.casinoBonuses?.length && !casino.freeSpins?.length && (
              <div className="flex min-h-[84px] items-center justify-center rounded-md border border-blue-100 bg-blue-50 p-3 text-center text-base leading-6">
                {casino.name}
              </div>
            )}
          </div>
        </div>
        <div className="mt-2 rounded-md border border-slate-100 bg-slate-50 p-2.5">
          {casino.advantages.map((advantage: string) => (
            <div
              key={casino._id}
              className="mb-1 flex items-center gap-2 text-sm text-gray-700"
            >
              <CheckBadgeIcon className="h-4 w-4 text-button" />
              {advantage}
            </div>
          ))}
        </div>
        <div className="mt-2 flex flex-col-reverse items-center justify-center gap-2">
          <Link
            href={`/${casino.slug.current}`}
            prefetch={false}
            className="flex w-full items-center justify-center rounded-md border border-gray-300 px-6 py-2.5 text-center text-xs font-medium text-gray-500 lg:hover:bg-gray-200"
          >
            {' '}
            Läs recension
          </Link>
          {/*<AffiliateLink*/}
          {/*  className="w-full !py-3.5 !text-base"*/}
          {/*  affiliateLink={item.postType?.affiliateLink?.node?.slug}*/}
          {/*  pathname={pathname}*/}
          {/*  place="Regular toplist"*/}
          {/*>*/}
          {/*  Till {item.title}*/}
          {/*</AffiliateLink>*/}
        </div>
      </div>
      {casino.terms ? (
        <div className="h-[37px] overflow-y-auto rounded-b-md bg-white px-4 py-2 text-xs3 text-gray-400">
          <Paragraph content={casino.terms} />
        </div>
      ) : (
        <div className="rounded-b-md bg-white px-2 py-3 text-center text-xs text-gray-400">
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
      )}
    </div>
  )
}

export default CasinoCard
