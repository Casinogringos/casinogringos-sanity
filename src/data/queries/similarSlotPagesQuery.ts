import { slotPagePreviewProjection } from '@/src/data/projections/slotPagePreviewProjection'

export const similarSlotPagesQuery = ({ id, count }: { id: string; count?: number }) => `
    *[_type == 'slot-pages' && _id != '${id}'][0..${count ?? 24}] {
      ${slotPagePreviewProjection}
    }
`
