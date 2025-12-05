import { newsPagePreviewProjection } from '@/src/data/projections/newsPagePreviewProjection'

export const newsPagePreviewsQuery = ({
  count,
  offset,
}: {
  count: number
  offset: number
}) => {
  // const coalesce = `select(_updatedAt == _createdAt => originalModifiedAt, _updatedAt)`
  const coalesce = `coalesce(publishedAt, originalPublishedAt, _createdAt)`
  return `
  *[_type == 'news-pages' && (!defined(publishedAt) || publishedAt <= now()) && !(_id match "drafts.*")] | order(${coalesce} desc)[${offset}..${offset + count - 1}] {
    ${newsPagePreviewProjection}
  }
`
}
