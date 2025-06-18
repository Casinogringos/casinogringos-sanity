import { casinoPreviewProjection } from '@/src/data/projections'

export const casinoPreviewsQuery = ({ count }: { count: number }) => `
  *[_type == 'casinos' && !(_id in path("drafts.**"))][0..${count}] {
    ${casinoPreviewProjection}
  }
`
