import { casinoPagePreviewProjection } from '@/src/data/projections/casinoPagePreviewProjection'

export const similarCasinoPagesQuery = ({
  id,
  count,
}: {
  id: string
  count: number
}) => `
  *[_type == 'casino-pages' && (!defined(publishedAt) || publishedAt <= now()) && !(_id match "drafts.*") && _id != "${id}"][0...${count}] {
    ${casinoPagePreviewProjection}
  }
`
