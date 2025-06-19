import { casinoProjection } from '@/src/data/projections'

export const toplistProjection = `
  title,
  description,
  casinos[]->{
    ${casinoProjection}
  },
`
