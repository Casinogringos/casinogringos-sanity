import Star from '@/src/components/icons/StarIcon'
import StarHalf from '@/src/components/icons/HalfStarIcon'
import { CasinoPageSchemaType } from '@/src/schemas'
import Image from 'next/image'
import Link from '@/src/components/atoms/Link'
export default function CasinoHero({
  casinoPage
}: {
  casinoPage: CasinoPageSchemaType
}) {
  const { casino } = casinoPage

  return (
    <div className="bg-darklight py-5 lg:py-16">
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
            <h1 className="text-3xl font-bold text-white">{casinoPage.title}</h1>
            {casino.casinoBonuses && casino.casinoBonuses.length > 0 && (
              <div className="pb-2 pt-1 text-xl font-bold text-primary">
                {casino.casinoBonuses[0].bonusAmountRange[1]} kr
              </div>
            )}
            {casino.overallRating && (
              <div className="mb-6 mt-1 flex">
                {Array.from({ length: Math.floor(casino.overallRating) }).map((_, index) => (
                  <Star
                    key={`rating-star-${index}`}
                    className="h-5 w-5 text-yellow400"
                  />
                ))}
                {casino.overallRating % 1 !== 0 && (
                  <StarHalf
                    key="rating-star-half"
                    className="h-5 w-5 text-yellow400"
                  />
                )}
              </div>
            )}
            {casinoPage.intro && (
              <p className="mb-6 text-lg text-gray100">{casinoPage.intro}</p>
            )}
            {casinoPage.affiliateLink && (
              <Link
                href={casinoPage.affiliateLink}
                title={casinoPage.title}
                place="CasinoCard recension"
              >
                Till {casinoPage.title}
              </Link>
            )}
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
        <div className="rounded-b-md pt-4 text-xs3 text-gray400 shadow-2xl">
          18+ | Spela ansvarsfullt | Stödlinjen.se | Spelpaus.se | Regler och
          villkor gäller
        </div>
      </div>
    </div>
  )
}
