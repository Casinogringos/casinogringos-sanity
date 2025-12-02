import { guidePageProjection } from '@/src/data/projections/guidePageProjection'

export const guidePageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'guide-pages' && !(_id match "drafts.*") && slug.current == '${slug}'] {
      ${guidePageProjection}
    }
`
