import { newsPagePreviewProjection } from '@/src/data/projections'

export const similarNewsPagesQuery = ({
  id,
  count,
}: {
  id: string
  count: number
}) => `
  *[_type == 'news-pages' && id != ${id}][0...${count}] {
    ${newsPagePreviewProjection}
  }
`
