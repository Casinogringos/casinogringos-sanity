import { casinoPagePreviewProjection } from '@/src/data/projections'

export const similarCasinoPagesQuery = ({
  id,
  count,
}: {
  id: string
  count: number
}) => `
  *[_type == 'casino-pages' && _id != "${id}"][0...${count}] {
    ${casinoPagePreviewProjection}
  }
`
