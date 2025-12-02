import { newsPageProjection } from '@/src/data/projections/newsPageProjection'

export const newsPageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'news-pages' && !(_id match "drafts.*") && slug.current == '${slug}'] {
      ${newsPageProjection}
    }
`
