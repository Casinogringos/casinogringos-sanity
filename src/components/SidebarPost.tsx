'use client'

import { usePlausible } from 'next-plausible'
import Link from 'next/link'
import ImageComponent from './ImageComponent'
import InternalLink from './InternalLink'
const SidebarPost = ({ item, pathname }) => {
  const plausible = usePlausible()

  return (
    <>
      <div className="mt-2 flex w-full items-center rounded-md border border-blue100 bg-slate100 px-3 py-2.5">
        <ImageComponent
          image={item?.featuredImage?.node}
          width={45}
          className="mr-3 rounded-full"
        />
        <div>
          <span className="text-xs font-medium text-slate900">
            {item.title}
          </span>
          <p className="pr-4 text-sm font-medium">{item?.postType?.title}</p>
        </div>
        <InternalLink
          href={`/go/${item.postType.affiliateLink.node.slug}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          prefetch={false}
          className="ml-auto rounded-md bg-button px-4 py-2 text-xs text-white"
          onClick={() =>
            plausible('AffiliateClick', {
              props: {
                buttonId: item.title,
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

export default SidebarPost
