import { newsPagePreviewProjection } from '@/src/data/projections/newsPagePreviewProjection'

export const similarNewsPagesQuery = ({
  id,
  count,
}: {
  id: string
  count: number
}) => `
  *[_type == 'news-pages' && id != '${id}'] | order(select(originalPublishedAt, _createdAt) desc) [0...${count}] {
    ${newsPagePreviewProjection}
  }
`
