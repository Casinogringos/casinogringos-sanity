import Link from '@/src/components/content/Link'
import Star from '@/src/components/icons/StarIcon'
import { formatSlug } from '@/src/lib/utils'
import { CasinoCardDTO } from '@/src/types/casinoCardDTO'
import { Check, X } from 'lucide-react'
import { PortableText } from 'next-sanity'
import Image from 'next/image'

const CasinoCard = ({
  casino,
  index,
  pathname = '',
}: {
  casino: CasinoCardDTO
  index: number
  pathname?: string
}) => {
  if (!casino) return null

  const availabilityItems = [
    {
      key: 'swish',
      label: 'Swish',
      icon: '/swish-logo.webp',
      available: casino.hasSwish,
    },
    {
      key: 'trustly',
      label: 'Trustly',
      icon: '/trustly-logo.webp',
      available: casino.hasTrustly,
    },
    {
      key: 'swedish-license',
      label: 'Svensk licens',
      icon: '/svensk-licens.webp',
      available: casino.swedishLicense,
    },
  ]

  return (
    <>
      <li className="rounded-md border-b border-b-gray-100 bg-white p-3.5 shadow-2xl">
        <div className="flex flex-col gap-x-8 gap-y-2">
          <div
            className="relative h-28 flex-col items-center overflow-hidden rounded-md px-3 py-4"
            style={{ background: casino.brandColor ?? '' }}
          >
            <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-br-md bg-slate-200/20 text-sm font-medium text-slate-100">
              {index + 1}
            </span>
            <div className="-mb-4 -mt-1.5 flex h-full w-full items-center justify-center">
              <Image
                src={casino.logo?.src}
                alt={casino.logo?.altText || casino.name}
                width={288}
                height={288}
                quality={50}
                sizes="(max-width: 768px) 144px, 288px"
                className={'h-36 w-36'}
              />
            </div>
            <div className="my-2 flex w-full items-center justify-between text-xs text-white">
              <div>{casino.name}</div>
              {casino.finalRating && (
                <div className="ml-auto flex items-center justify-center rounded-full bg-black/40 px-2 py-0.5 text-xs">
                  Betyg: {casino.finalRating}
                  <Star className="-mt-0.5 ml-1 h-3.5 w-3.5 text-yellow-400" />
                </div>
              )}
            </div>
          </div>
          <div className="block text-xs text-black">
            <div className="grid grid-cols-2 gap-2">
              {casino.bonusAmount || casino.numberOfFreeSpins ? (
                <>
                  <div className="uppercase flex min-h-[84px] font-bold flex-col items-center justify-center rounded-md border border-green-200 bg-green-100 p-2 text-lg leading-6">
                    <div className="-mb-1 block font-semibold text-[10px] text-gray-700">
                      Bonus
                    </div>
                    {casino.bonusAmount ? casino.bonusAmount + ' kr' : '-'}
                    {casino.wageringRequirementsBonus && (
                      <div className="-mt-0.5 flex items-center text-[10px] font-medium text-gray-700">
                        Omsättning:
                        <span className="ml-0.5 inline-block text-black">
                          {casino.wageringRequirementsBonus}x{' '}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="uppercase flex min-h-[84px] flex-col font-bold items-center justify-center rounded-md border border-blue-100 bg-blue-50 p-2 text-lg leading-6">
                    <div className="-mb-1 block font-semibold text-[10px] text-gray-700">
                      Freespins
                    </div>
                    {casino.numberOfFreeSpins ? (
                      <>
                        {casino.numberOfFreeSpins}
                        <div className="-mt-0.5 flex items-center text-[10px] font-medium text-gray-700">
                          Omsättning:{' '}
                          <span className="ml-0.5 inline-block text-black">
                            {casino.wageringRequirementsFreespins}x
                          </span>
                        </div>
                      </>
                    ) : (
                      '-'
                    )}
                  </div>
                </>
              ) : (
                <div className="col-span-2 min-h-[84px] font-semibold flex flex-col items-center justify-center rounded-md border border-blue-100 bg-blue-50 p-2 text-lg leading-6">
                  <span className="text-gray-700 text-lg">
                    {casino.defaultBonusText}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {availabilityItems.map((item) => (
                <div
                  key={item.key}
                  className={`flex flex-col items-center gap-1 rounded-md border border-slate-200 bg-white p-2 text-[10px] text-dark font-medium ${
                    item.available
                      ? 'text-slate-700'
                      : 'text-slate-400 !bg-gray-100'
                  }`}
                >
                  <div className="relative h-8 w-20 flex justify-center items-center">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={128}
                      height={48}
                      className={`h-6 w-16 object-contain ${
                        item.available ? '' : 'opacity-40 grayscale'
                      }`}
                    />
                    <span
                      className={`absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full ${
                        item.available
                          ? 'bg-green-500 text-white'
                          : 'bg-slate-400 text-white'
                      }`}
                      aria-hidden="true"
                    >
                      {item.available ? (
                        <Check className="h-2.5 w-2.5" />
                      ) : (
                        <X className="h-2.5 w-2.5" />
                      )}
                    </span>
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-2 flex flex-col-reverse items-center justify-center gap-2">
              <Link
                href={`${formatSlug(casino.parentCasinoPageSlug ?? '')}`}
                prefetch={false}
                className="flex w-full items-center justify-center rounded-md border border-gray-300 px-6 py-2.5 text-center text-xs font-medium !text-gray-500 lg:hover:bg-gray-100"
              >
                {' '}
                Läs recension
              </Link>
              {casino.affLinkSlug ? (
                <Link
                  href={`/go/${casino.affLinkSlug}`}
                  prefetch={false}
                  variant="affiliate"
                  size="lg"
                  plausible={{
                    eventName: 'AffiliateClick',
                    props: {
                      casino: casino.name,
                      place: 'Regular toplist',
                      pathname: pathname,
                    },
                  }}
                  className="w-full"
                  target="_blank"
                  aria-label={`Öppna ${casino.name} i ett nytt fönster`}
                >
                  Till {casino.name}
                </Link>
              ) : null}
            </div>
          </div>
          {casino.terms ? (
            <div className="h-[37px] overflow-y-auto rounded-b-md bg-white px-4 py-2 text-2xs text-gray-400">
              <PortableText value={casino.terms} />
            </div>
          ) : (
            <div className="rounded-b-md  h-[37px] bg-white px-2 py-3 text-center text-2xs text-gray-400">
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
      </li>
    </>
  )
}

export default CasinoCard
