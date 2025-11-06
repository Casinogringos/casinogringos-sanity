import { casinoProjection } from '@/src/data/projections/casinoProjection'

export const toplistProjection = `
  _key,
  title,
  description,
  casinos[]-> {
    ${casinoProjection}
  },
`
