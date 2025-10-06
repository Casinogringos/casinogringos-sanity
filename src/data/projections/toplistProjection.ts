import { casinoPagePreviewProjection } from '@/src/data/projections/casinoPagePreviewProjection'

export const toplistProjection = `
  _key,
  title,
  description,
  casinos[]-> {
    ${casinoPagePreviewProjection}
  },
`
