import { pageProjection } from '@/src/data/projections/pageProjection'

export const pageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'pages' && slug.current == '${slug}'] {
      ${pageProjection}
    }
`
