import { newsPageProjection } from '@/src/data/projections'

export const newsPageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'news-pages' && slug.current == '${slug}'] {
      ${newsPageProjection}
    }
`
