import { newsPagePreviewProjection } from '@/src/data/projections/newsPagePreviewProjection'

export const similarNewsPagesQuery = ({
  slug,
  count,
}: {
  slug: string
  count: number
}) => `
  *[_type == 'news-pages' && (!defined(publishedAt) || publishedAt <= now()) && !(_id match "drafts.*") && slug.current != "${slug}"] | order(coalesce(originalPublishedAt, publishedAt, _createdAt) desc) [0...${count}] {
    ${newsPagePreviewProjection}
  }
`
