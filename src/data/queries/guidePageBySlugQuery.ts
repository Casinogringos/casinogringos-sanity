import { guidePageProjection } from '@/src/data/projections/guidePageProjection'

export const guidePageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'guide-pages' && (!defined(publishedAt) || publishedAt <= now()) && !(_id match "drafts.*") && slug.current == '${slug}'] {
      ${guidePageProjection}
    }
`
