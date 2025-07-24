import { toplistProjection } from '@/src/data/projections'

export const casinoListObjectProjection = `
  _type == 'casino-list-object' => {
    _type,
    _id,
    _key,
    toplist-> {
        ${toplistProjection}
    },
  }
`
