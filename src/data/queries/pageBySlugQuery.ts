import { pageProjection } from '@/src/data/projections'

export const pageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'pages' && slug.current == '${slug}'] {
      {...pageProjection}
    }
    ${pageProjection}
`
