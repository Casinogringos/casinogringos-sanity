import { guidePageProjection } from '@/src/data/projections'

export const guidePageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'guide-pages' && slug.current == '${slug}'] {
      ${guidePageProjection}
    }
`
