import { newsPagePreviewProjection } from '@/src/data/projections/newsPagePreviewProjection'

export const similarNewsPagesQuery = ({
  slug,
  count,
}: {
  slug: string
  count: number
}) => `
  *[_type == 'news-pages' && slug.current != "${slug}"] | order(select(originalPublishedAt, _createdAt) desc) [0...${count}] {
    ${newsPagePreviewProjection}
  }
`
