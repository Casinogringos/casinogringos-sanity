import { slotPagePreviewProjection } from '@/src/data/projections'

export const slotPagePreviewsQuery = ({ count }: { count?: number }) => `
    *[_type == 'slot-pages'][0..${count ?? 24}] {
      ${slotPagePreviewProjection}
    }
`
