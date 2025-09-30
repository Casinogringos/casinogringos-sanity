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
              size={6}
              className="text-3xl font-bold text-white !mb-0"
              text={casinoPage.title}
            />
            <div className="pb-2 pt-1 text-xl font-bold text-primary">
              {casinoService.getBonusString({ casino: casinoPage.casino })}
            </div>
            {finalRating && finalRating > 0 ? (
              <div className="mb-6 mt-1 flex">
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
            <Link
              href={`/go/${casino.slug.current}`}
              title={casinoPage.title}
              place="CasinoCard recension"
              variant="affiliate"
              className="w-full"
            >
              Till {casinoPage.title}
            </Link>
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
