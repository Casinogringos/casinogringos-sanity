import Star from '@/src/components/icons/StarIcon'
import CasinoService from '@/src/services/CasinoService'
import Image from 'next/image'
import Link from '@/src/components/content/Link'
import CheckBadgeIcon from '@/src/components/icons/CheckBadgeIcon'
import Paragraph from '@/src/components/content/Paragraph'
import { CasinoSchemaType } from '@/src/schemas/casino'

const CasinoCard = ({
  casino,
  index,
  categories,
}: {
  casino: CasinoSchemaType
  index: number
  categories: { value: string }[]
}) => {
  if (!casino) return null
  const casinoService = new CasinoService()
  const { finalRating } = casinoService.getCasinoRatings({ casino })
  const bonusCategory = casinoService.chooseBonusCategory({
    categories,
    casino,
  })
  const affLinkSlug = casinoService.getAffLinkSlug({
    bonusCategory,
    casino,
  })
  const getBonus = () => {
    switch (bonusCategory.value) {
      case 'casino-bonus':
        return casino.casinoBonuses?.[0]?.bonusAmountRange?.max ?? null
      case 'odds-bonus':
        return casino.oddsBonuses?.[0]?.bonusAmountRange?.max ?? null
      case 'live-casino-bonus':
        return casino.liveCasinoBonuses?.[0]?.bonusAmountRange?.max ?? null
      default:
        return null
    }
  }
  const getWageringRequirementsBonus = () => {
    switch (bonusCategory.value) {
      case 'casino-bonus':
        return casino.casinoBonuses?.[0].wageringRequirements ?? null
      case 'odds-bonus':
        return casino.oddsBonuses?.[0].wageringRequirements ?? null
      case 'live-casino-bonus':
        return casino.liveCasinoBonuses?.[0].wageringRequirements ?? null
      default:
        return null
    }
  }
  const numberOfFreeSpins = casino.freeSpins?.[0]?.numberOfFreeSpins ?? null
  const wageringRequirementsFreespins =
    casino.freeSpins?.[0]?.wageringRequirements ?? null
  const bonus = getBonus()
  const wageringRequirementsBonus = getWageringRequirementsBonus()
  return (
    <>
      <div className="rounded-md border-b border-b-gray-100 bg-white p-3.5 shadow-2xl">
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
                src={casino.logo?.src}
                alt={casino.logo?.altText}
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
                  <Star className="-mt-0.5 ml-1 h-3.5 w-3.5 text-yellow-400" />
                </div>
              )}
            </div>
          </div>
          <div className="block text-xs text-black">
            <div className="grid grid-cols-2 gap-2">
              {bonus || numberOfFreeSpins ? (
                <>
                  {bonus ? (
                    <div className="uppercase flex min-h-[84px] font-medium flex-col items-center justify-center rounded-md border border-green-200 bg-green-100 p-2 text-lg leading-6">
                      <div className="-mb-1 block text-[10px] text-gray-700">
                        Bonus
                      </div>
                      {bonus ? bonus + ' kr' : '-'}
                      {wageringRequirementsBonus && (
                        <div className="-mt-0.5 flex items-center text-[10px] font-medium text-gray-700">
                          Omsättning:
                          <span className="ml-0.5 inline-block text-black">
                            {wageringRequirementsBonus}x{' '}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={
                        'uppercase flex min-h-[84px] font-medium flex-col items-center justify-center rounded-md border border-green-200 bg-green-100 p-2 text-lg leading-6'
                      }
                    >
                      -
                    </div>
                  )}
                  {numberOfFreeSpins ? (
                    <div className="uppercase flex min-h-[84px] flex-col items-center justify-center rounded-md border border-blue-100 bg-blue-50 p-2 text-lg leading-6">
                      <div className="-mb-1 block text-[10px] text-gray-700">
                        Freespins
                      </div>
                      {numberOfFreeSpins ? (
                        <>
                          {numberOfFreeSpins}
                          <div className="-mt-0.5 flex items-center text-[10px] font-medium text-gray-700">
                            Omsättning:{' '}
                            <span className="ml-0.5 inline-block text-black">
                              {wageringRequirementsFreespins}x
                            </span>
                          </div>
                        </>
                      ) : (
                        '-'
                      )}
                    </div>
                  ) : (
                    <div
                      className={
                        'uppercase flex min-h-[84px] font-medium flex-col items-center justify-center rounded-md border border-blue-100 bg-blue-50 p-2 text-lg leading-6'
                      }
                    >
                      -
                    </div>
                  )}
                </>
              ) : (
                <div className="col-span-2 min-h-[84px] font-medium flex flex-col items-center justify-center rounded-md border border-blue-100 bg-blue-50 p-2 text-lg leading-6">
                  <span className="text-gray-700 text-sm">
                    {casino.defaultBonusText}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-2 rounded-md border border-slate-100 bg-slate-50 p-2.5">
              {casino.advantages.map((advantage: string, index: number) => (
                <div
                  key={`${casino._id}-advantage-${index}`}
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
              {affLinkSlug || casino.affLink ? (
                <Link
                  href={`/go${affLinkSlug || casino.affLink.slug.current}`}
                  prefetch={false}
                  variant="affiliate"
                  className="w-full"
                  target="_blank"
                >
                  Till {casino.name}
                </Link>
              ) : null}
            </div>
          </div>
          {casino.terms ? (
            <div className="h-[37px] overflow-y-auto rounded-b-md bg-white px-4 py-2 text-xs text-gray-400">
              <Paragraph content={casino.terms} />
            </div>
          ) : (
            <div className="rounded-b-md overflow-y-auto h-[37px] bg-white px-2 py-3 text-center text-2xs text-gray-400">
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
      </div>
    </>
  )
}

export default CasinoCard
