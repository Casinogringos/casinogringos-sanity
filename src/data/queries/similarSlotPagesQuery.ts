import { slotPagePreviewProjection } from '@/src/data/projections/slotPagePreviewProjection'

export const similarSlotPagesQuery = ({
  slug,
  count,
}: {
  slug: string
  count?: number
}) => `
    *[_type == 'slot-pages' && (!defined(publishedAt) || publishedAt <= now()) && !(_id match "drafts.*") && slug.current != '${slug}'][0...${count ?? 4}] {
      ${slotPagePreviewProjection}
    }
`
