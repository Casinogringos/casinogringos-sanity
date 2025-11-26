import Heading from '@/src/components/content/Heading'
import Link from '@/src/components/content/Link'
import StarHalf from '@/src/components/icons/HalfStarIcon'
import Star from '@/src/components/icons/StarIcon'
import { formatSlug } from '@/src/lib/utils'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import CasinoService from '@/src/services/CasinoService'
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import Container from '../layout/Container'

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
  const bonus = casino.casinoBonuses?.[0]?.bonusAmountRange.max ?? null
  const bonusWageringRequirements =
    casino.casinoBonuses?.[0]?.wageringRequirements ?? null
  const freeSpins = casino.freeSpins?.[0]?.numberOfFreeSpins ?? null
  const freeSpinsWageringRequirements =
    casino.freeSpins?.[0]?.wageringRequirements ?? null

  return (
    <div className="bg-darklight py-5 lg:py-16 not-prose">
      <Container>
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
                priority={true}
                className="rounded-full hover:shadow-medium"
              />
            </div>
          </div>
          <div className="lg:w-3/4">
            <div className="flex flex-col md:flex-row items-center md:justify-between">
              <Heading
                level={1}
                sizes={[5, 6, 7]}
                className="text-3xl font-bold md:mb-4 text-white"
                text={casinoPage.title}
              />
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
            </div>
            {casinoPage.intro && (
              <div className="mb-6 text-lg text-gray-100">
                <PortableText value={casinoPage.intro} />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {bonus || freeSpins ? (
                <>
                  <div className="uppercase flex gap-y-2 min-h-[85px] font-bold flex-col items-center justify-center rounded-md bg-white/10 p-6 text-xl md:text-2xl text-white leading-6">
                    <div className="-mb-1 block text-xs text-slate-400">
                      Bonus
                    </div>
                    {bonus ? bonus + ' kr' : '-'}
                    {bonusWageringRequirements && (
                      <div className="-mt-0.5 flex items-center text-xs font-medium text-slate-400">
                        Omsättning:
                        <span className="ml-0.5 inline-block text-white">
                          {bonusWageringRequirements}x{' '}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="uppercase flex min-h-[85px] gap-y-2 flex-col items-center justify-center rounded-md bg-white/10 p-6 text-2xl text-white font-bold leading-6">
                    <div className="-mb-1 block text-xs text-slate-400">
                      Freespins
                    </div>
                    {freeSpins ? (
                      <>
                        {freeSpins}
                        <div className="-mt-0.5 flex items-center text-xs font-medium text-slate-400">
                          Omsättning:{' '}
                          <span className="ml-0.5 inline-block text-white">
                            {freeSpinsWageringRequirements}x
                          </span>
                        </div>
                      </>
                    ) : (
                      '-'
                    )}
                  </div>
                </>
              ) : (
                <div className="col-span-2 min-h-[86px] font-medium flex flex-col items-center justify-center rounded-md bg-white/10 p-6 text-xl text-white leading-6">
                  <span>{casino.defaultBonusText}</span>
                </div>
              )}
            </div>
            {casino.affLink && (
              <Link
                href={`/go${formatSlug(casino.affLink.slug.current)}`}
                title={casinoPage.title}
                place="CasinoCard recension"
                variant="affiliate"
                size="xl"
                plausible={{
                  eventName: 'AffiliateClick',
                  props: {
                    casino: casino.name,
                    place: 'Casino Hero',
                    pathname: `/${casino.slug.current}`,
                  },
                }}
                className="w-full"
              >
                Till {casinoPage.title}
              </Link>
            )}
            <div className="rounded-b-md pt-4 text-center text-2xs text-slate-400 shadow-2xl">
              {casino.terms ? (
                <PortableText value={casino.terms} />
              ) : (
                <>
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
                </>
              )}
            </div>
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
      </Container>
    </div>
  )
}
