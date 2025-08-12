import { casinoPagePreviewProjection } from '@/src/data/projections/casinoPagePreviewProjection'

export const casinoPagePreviewsQuery = ({ count }: { count: number }) => `
  *[_type == 'casino-pages' && [0...${count}]] {
      ${casinoPagePreviewProjection}
  }
`
