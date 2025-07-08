import { casinoPageProjection } from '@/src/data/projections'

export const toplistProjection = `
_key,
  title,
  description,
  casinos[]->{
    ${casinoPageProjection}
  },
`
