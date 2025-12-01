import { casinoPagePreviewProjection } from '@/src/data/projections/casinoPagePreviewProjection'

export const casinoPagePreviewsQuery = ({ count }: { count: number }) => `
  *[_type == 'casino-pages' && !(_id match "drafts.*") && [0...${count}]] {
      ${casinoPagePreviewProjection}
  }
`
