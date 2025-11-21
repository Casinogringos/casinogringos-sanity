import { slotPagePreviewProjection } from '@/src/data/projections/slotPagePreviewProjection'

export const similarSlotPagesQuery = ({ slug, count }: { slug: string; count?: number }) => `
    *[_type == 'slot-pages' && slug.current != '${slug}'][0...${count ?? 4}] {
      ${slotPagePreviewProjection}
    }
`
