import { guidePagePreviewProjection } from '@/src/data/projections/guidePagePreviewProjection'

export const similarGuidePagesQuery = ({
  slug,
  count,
}: {
  slug: string
  count: number
}) => `
  *[_type == 'guide-pages' && (!defined(publishedAt) || publishedAt <= now()) && !(_id match "drafts.*") && slug.current != "${slug}"] | order(coalesce(originalPublishedAt, publishedAt, _createdAt) desc) [0...${count}] {
    ${guidePagePreviewProjection}
  }
`
