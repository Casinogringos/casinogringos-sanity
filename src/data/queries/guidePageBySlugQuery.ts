import { guidePageProjection } from '@/src/data/projections/guidePageProjection'

export const guidePageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'guide-pages' && slug.current == '${slug}'] {
      ${guidePageProjection}
    }
`
