import { newsPagePreviewProjection } from '@/src/data/projections/newsPagePreviewProjection'

export const newsPagePreviewsQuery = ({
  count,
  offset,
}: {
  count: number
  offset: number
}) => `
    *[_type == 'news-pages'][${offset}..${offset + count - 1}] | order(publishedAt desc) {
      ${newsPagePreviewProjection}
    }
`
