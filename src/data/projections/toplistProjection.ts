import { casinoPageProjection } from '@/src/data/projections'

export const toplistProjection = `
  title,
  description,
  casinos[]->{
    ${casinoPageProjection}
  },
`
