import { slotPageProjection } from '@/src/data/projections'

export const slotPageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'slot-pages' && slug.current == '${slug}'] {
      ${slotPageProjection}
    }
`
