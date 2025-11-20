import { guidePagePreviewProjection } from '@/src/data/projections/guidePagePreviewProjection'

export const similarGuidePagesQuery = ({
  slug,
  count,
}: {
  slug: string
  count: number
}) => `
  *[_type == 'guide-pages' && slug.current != "${slug}"] | order(select(originalPublishedAt, _createdAt) desc) [0...${count}] {
    ${guidePagePreviewProjection}
  }
`
