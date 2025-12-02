import { slotPageProjection } from '@/src/data/projections/slotPageProjection'

export const slotPageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'slot-pages' && !(_id match "drafts.*") && slug.current == '${slug}'] {
      ${slotPageProjection}
    }
`
