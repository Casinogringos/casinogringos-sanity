import { slotPagePreviewProjection } from '@/src/data/projections/slotPagePreviewProjection'

export const slotPagePreviewsQuery = ({ count }: { count?: number }) => `
    *[_type == 'slot-pages'][0..${count ?? 100}] {
      ${slotPagePreviewProjection}
    }
`
