import { guidePagePreviewProjection } from '@/src/data/projections/guidePagePreviewProjection'

export const guidePagePreviewsQuery = ({
  count,
  offset,
}: {
  count: number
  offset: number
}) => `
    *[_type == 'guide-pages' && !(_id match "drafts.*")] | order(coalesce(publishedAt, originalPublishedAt, _createdAt) desc)[${offset}..${offset + count - 1}] {
      ${guidePagePreviewProjection}
    }
`
