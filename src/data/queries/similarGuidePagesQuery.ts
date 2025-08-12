import { guidePagePreviewProjection } from '@/src/data/projections/guidePagePreviewProjection'

export const similarGuidePagesQuery = ({
  id,
  count,
}: {
  id: string
  count: number
}) => `
  *[_type == 'guide-pages' && id != ${id}][0...${count}] {
    ${guidePagePreviewProjection}
  }
`
