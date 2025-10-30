import Star from '@/src/components/icons/StarIcon'
import StarHalf from '@/src/components/icons/HalfStarIcon'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import Image from 'next/image'
import Link from '@/src/components/content/Link'
import { PortableText } from 'next-sanity'
import CasinoService from '@/src/services/CasinoService'
import Heading from '@/src/components/content/Heading'

export default function CasinoHero({
  casinoPage,
}: {
  casinoPage: CasinoPageSchemaType
}) {
  const { casino } = casinoPage
  const casinoService = new CasinoService()
  const { finalRating } = casinoService.getCasinoRatings({
    casino: casinoPage.casino,
  })
  const bonus = casinoPage.casinoBonusPages?.[0].casinoBonus.bonusAmountRange.max ?? null
  const wageringRequirements = casinoPage.casinoBonusPages?.[0].casinoBonus.wageringRequirements ?? null
  const freeSpins = casinoPage.freeSpinsPages?.[0].freeSpinsBonus.numberOfFreeSpins ?? null

  return (
    <div className="bg-darklight py-5 lg:py-16 not-prose">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="flex h-full w-full flex-col gap-x-10 lg:flex-row">
          <div
            className="mb-4 flex items-center justify-center overflow-hidden rounded-md lg:mb-0 lg:min-h-full lg:w-1/4"
            style={{ background: casino.brandColor }}
          >
            <div className="overflow-hidden rounded-full">
              <Image
                src={casino.logo.src}
                alt={casino.logo.altText}
                width={150}
                height={150}
                className="rounded-full hover:shadow-medium"
              />
            </div>
          </div>
          <div className="lg:w-3/4">
            <Heading
              level={1}
              sizes={[6, 6, 7]}
              className="text-3xl font-bold text-white mb-4"
              text={casinoPage.title}
            />
            {/* <div className="pb-2 pt-1 text-xl font-bold text-primary">
              {casino.defaultBonusText}
            </div> */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {bonus || freeSpins ? (
                <>
                  {bonus ? <div className="uppercase flex min-h-[84px] font-medium flex-col items-center justify-center rounded-md border border-green-200 bg-green-100 p-2 text-lg leading-6">
                    <div className="-mb-1 block text-xs text-gray-700">Bonus</div>
                    {bonus ? bonus + ' kr' : '-'}
                    {wageringRequirements && (
                      <div className="-mt-0.5 flex items-center text-xs font-medium text-gray-700">
                        Omsättning:
                        <span className="ml-0.5 inline-block text-black">
                          {wageringRequirements}x{' '}
                        </span>
                      </div>
                    )}
                  </div> : <div className={"uppercase flex min-h-[84px] font-medium flex-col items-center justify-center rounded-md border border-green-200 bg-green-100 p-2 text-lg leading-6"}>{casino.defaultBonusText}</div>}
                  {freeSpins ? <div className="uppercase flex min-h-[84px] flex-col items-center justify-center rounded-md border border-blue-100 bg-blue-50 p-2 text-lg leading-6">
                    <div className="-mb-1 block text-xs text-gray-700">
                      Freespins
                    </div>
                    {freeSpins ? (
                      <>
                        {freeSpins ?? '-'}
                        <div className="-mt-0.5 flex items-center text-xs font-medium text-gray-700">
                          Omsättning:{' '}
                          <span className="ml-0.5 inline-block text-black">
                            {wageringRequirements}x
                          </span>
                        </div>
                      </>
                    ) : (
                      '-'
                    )}
                  </div> : <div className={"uppercase flex min-h-[84px] font-medium flex-col items-center justify-center rounded-md border border-blue-100 bg-blue-50 p-2 text-lg leading-6"}>-</div>}
                </>
              ) : (
                <div className='col-span-2 min-h-[84px] font-medium flex flex-col items-center justify-center rounded-md border border-blue-100 bg-blue-50 p-2 text-lg leading-6'>
                  <span className="text-gray-700 text-xs">
                    {casino.defaultBonusText}
                  </span>
                </div>
              )}
            </div>
            {finalRating && finalRating > 0 ? (
              <div className="mb-4 mt-1 flex">
                {Array.from({ length: Math.floor(finalRating) }).map(
                  (_, index) => (
                    <Star
                      key={`rating-star-${index}`}
                      className="h-5 w-5 text-yellow-400"
                    />
                  )
                )}
                {finalRating % 1 !== 0 && (
                  <StarHalf
                    key="rating-star-half"
                    className="h-5 w-5 text-yellow-400"
                  />
                )}
              </div>
            ) : null}
            {casinoPage.intro && (
              <div className="mb-6 text-lg text-gray-100">
                <PortableText value={casinoPage.intro} />
              </div>
            )}
            {casinoPage.affLink && <Link
              href={`/go${casinoPage.affLink.slug.current}`}
              title={casinoPage.title}
              place="CasinoCard recension"
              variant="affiliate"
              className="w-full"
            >
              Till {casinoPage.title}
            </Link>}
          </div>
        </div>
        {/* <div className="hidden md:mb-12 md:block">
        <Avatar author={author} date={date} />
      </div> */}
        {/* <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          <Avatar author={author} />
        </div>
      </div> */}
        <div className="rounded-b-md pt-4 text-xs text-gray-400 shadow-2xl">
          18+ | Spela ansvarsfullt | Stödlinjen.se | Spelpaus.se | Regler och
          villkor gäller
        </div>
      </div>
    </div>
  )
}
