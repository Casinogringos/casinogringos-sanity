import Image from 'next/image'

import InternalLink from './InternalLink'
export default function SlotComponent({ node }) {
  return (
    <InternalLink prefetch={false} className="mb-6" href={node.uri}>
      <div className="relative mb-2 flex h-28 w-full overflow-hidden rounded-sm lg:h-40">
        <Image
          width={600}
          height={500}
          src={node.featuredImage?.node.sourceUrl}
          alt={node.featuredImage?.node.altText}
          className={'min-h-full min-w-full object-cover'}
        />
      </div>
      <span className="text-sm font-semibold text-heading">{node?.title}</span>
      <div className="text-slate-500 text-xs font-medium">
        {node?.slotType?.speltillverkare?.edges[0].node.name}
      </div>
    </InternalLink>
  )
}
