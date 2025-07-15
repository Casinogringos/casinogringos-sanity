import { casinoPreviewProjection } from '@/src/data/projections'

export const similarCasinoPagesQuery = ({
  id,
  count,
}: {
  id: string
  count: number
}) => `
  *[_type == 'casino-pages' && id != ${id}][0...${count}] {
    ${casinoPreviewProjection}
  }
`
