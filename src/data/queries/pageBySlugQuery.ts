import { pageProjection } from '@/src/data/projections/pageProjection'

export const pageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'pages' && !(_id match "drafts.*") && slug.current == '${slug}'] {
      ${pageProjection}
    }
`
