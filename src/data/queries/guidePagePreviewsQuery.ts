import { guidePagePreviewProjection } from '@/src/data/projections'

export const guidePagePreviewsQuery = ({
  count,
  offset,
}: {
  count: number
  offset: number
}) => `
    *[_type == 'guide-pages'] | order(publishedAt desc)[${offset}..${offset + count - 1}] {
      ${guidePagePreviewProjection}
    }
`
