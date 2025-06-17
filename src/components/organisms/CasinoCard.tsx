import Star from '@/src/components/icons/StarIcon'
import CasinoService from '@/src/services/CasinoService'
import { Post } from '@/src/types'
import Link from 'next/link'
import Button from '@/src/components/atoms/Button'
import CheckBadgeIcon from '../icons/CheckBadgeIcon'
import ImageWrap from '../atoms/ImageWrap'
import InternalLink from '../../../sin-bin/InternalLink'
import AffiliateLink from '@/src/sin-bin/AffiliateLink'

export default function CasinoCard({
  item,
  count,
  hidePopup,
  pathname,
}: {
  item: Post
  count: number
  hidePopup?: boolean
  pathname?: string
}) {
  const casinoService = new CasinoService()
  const { finalRating } = casinoService.getCasinoRating({ casino: item })

  return (
    <>
      <div className="rounded-t-md border-b border-b-gray100 bg-white p-3.5 shadow-2xl">
        <div className="flex flex-col gap-x-8 gap-y-2">
          <div
            className="relative h-28 flex-col items-center overflow-hidden rounded-md p-4"
            style={{ background: item.postType?.brandColor }}
          >
            {!hidePopup && (
              <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-br-md bg-slate200/20 text-sm font-medium text-slate100">
                {count}
              </span>
            )}{' '}
            <div className="-mb-4 -mt-1.5 flex h-full w-full items-center justify-center">
              <ImageWrap
                image={item.featuredImage?.node}
                width={288}
                quality={50}
                className={'h-36 w-36'}
              />
            </div>
            <div className="my-1.5 flex w-full items-center justify-between text-xs text-white">
              <div>{item.title}</div>
              {finalRating && (
                <div className="ml-auto flex items-center justify-center rounded-full bg-black/40 px-2 text-sm">
                  {finalRating}
                  <Star className="-mt-0.5 ml-1 h-3.5 w-3.5 text-yellow400" />
                </div>
              )}
            </div>
          </div>
          <div className="block text-sm font-bold uppercase text-black">
            {item.postType?.bonus || item.postType?.freespins ? (
              <div className="grid grid-cols-2 gap-2">
                <div className="flex min-h-[84px] flex-col items-center justify-center rounded-md border border-green200 bg-green100 p-2 text-lg leading-6">
                  <div className="-mb-1 block text-xs2 text-gray700">Bonus</div>
                  {item?.postType.bonus ? item?.postType.bonus + ' kr' : '-'}
                  {item?.postType?.wagering && (
                    <div className="-mt-0.5 flex items-center text-xs2 font-medium text-gray700">
                      Omsättning:
                      <span className="ml-0.5 inline-block text-black">
                        {item.postType.wagering}{' '}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex min-h-[84px] flex-col items-center justify-center rounded-md border border-blue100 bg-blue50 p-2 text-lg leading-6">
                  <div className="-mb-1 block text-xs2 text-gray700">
                    Freespins
                  </div>
                  {item?.postType.freespins ?? '-'}{' '}
                  {item?.postType.freespins && (
                    <div className="-mt-0.5 flex items-center text-xs2 font-medium text-gray700">
                      Omsättning:{' '}
                      <span className="ml-0.5 inline-block text-black">
                        {item?.postType?.wageringFreespins ?? '0x'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[84px] items-center justify-center rounded-md border border-blue100 bg-blue50 p-3 text-center text-base leading-6">
                {item.postType?.title}
              </div>
            )}
          </div>
        </div>
        <div className="mt-2 rounded-md border border-slate100 bg-slate50 p-2.5">
          <div className="mb-1 flex items-center gap-2 text-sm text-gray700">
            <CheckBadgeIcon className="h-4 w-4 text-button" />
            {item.postType?.description}
          </div>
          <div className="mb-1 flex items-center gap-2 text-sm text-gray700">
            <CheckBadgeIcon className="h-4 w-4 text-button" />
            {item.postType?.description2}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray700">
            <CheckBadgeIcon className="h-4 w-4 text-button" />
            {item.postType?.description3}
          </div>
        </div>
        <div className="mt-2 flex flex-col-reverse items-center justify-center gap-2">
          <InternalLink
            href={`/${item?.slug}`}
            prefetch={false}
            className="flex w-full items-center justify-center rounded-md border border-gray300 px-6 py-2.5 text-center text-xs font-medium text-gray500 lg:hover:bg-gray200"
          >
            {' '}
            Läs recension
          </InternalLink>
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
      {item.postType?.disclaimer ? (
        <div
          className="h-[37px] overflow-y-auto rounded-b-md bg-white px-4 py-2 text-xs3 text-gray400"
          dangerouslySetInnerHTML={{
            __html: item.postType?.disclaimer,
          }}
        />
      ) : (
        <div className="rounded-b-md bg-white px-2 py-3 text-center text-xs3 text-gray400">
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
    </>
  )
}
