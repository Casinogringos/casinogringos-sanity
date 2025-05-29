'use client'

import { usePlausible } from 'next-plausible'
import Link from 'next/link'
import ImageWrapper from '../atoms/ImageWrapper'
import InternalLink from '../../sin-bin/InternalLink'
import { Post } from '@/src/types/post'

const CasinoRow = ({
  casino,
  pathname,
}: {
  casino: Post
  pathname: string
}) => {
  const plausible = usePlausible()

  return (
    <>
      <div className="mt-2 flex w-full items-center rounded-md border border-blue100 bg-slate100 px-3 py-2.5">
        <ImageWrapper
          image={casino?.featuredImage?.node}
          width={45}
          className="mr-3 rounded-full"
        />
        <div>
          <span className="text-xs font-medium text-slate900">
            {item.title}
          </span>
          <p className="pr-4 text-sm font-medium">{casino?.postType?.title}</p>
        </div>
        <InternalLink
          href={`/go/${casino.postType.affiliateLink.node.slug}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          prefetch={false}
          className="ml-auto rounded-md bg-button px-4 py-2 text-xs text-white"
          onClick={() =>
            plausible('AffiliateClick', {
              props: {
                buttonId: casino.title,
                place: 'Sidebar',
                pathname: pathname,
              },
            })
          }
        >
          Besök
        </InternalLink>
      </div>
      <div className="rounded-b-md bg-white pt-1 text-center text-xs3 text-gray400 lg:text-left">
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
