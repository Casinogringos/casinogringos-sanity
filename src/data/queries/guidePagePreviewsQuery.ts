import { guidePagePreviewProjection } from '@/src/data/projections/guidePagePreviewProjection'

export const guidePagePreviewsQuery = ({
  count,
  offset,
}: {
  count: number
  offset: number
}) => `
    *[_type == 'guide-pages'] | order(select(originalPublishedAt, _createdAt) desc)[${offset}..${offset + count - 1}] {
      ${guidePagePreviewProjection}
    }
`
