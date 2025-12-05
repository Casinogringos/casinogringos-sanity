import { pageProjection } from '@/src/data/projections/pageProjection'

export const pageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'pages' && (!defined(publishedAt) || publishedAt <= now()) && !(_id match "drafts.*") && slug.current == '${slug}'] {
      ${pageProjection}
    }
`
