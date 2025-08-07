import { casinoPagePreviewProjection } from '@/src/data/projections'

export const toplistProjection = `
  _key,
  title,
  description,
  casinos[]-> {
    ${casinoPagePreviewProjection}
  },
`
