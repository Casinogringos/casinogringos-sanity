import { toplistProjection } from '@/src/data/projections/toplistProjection'

export const casinoTableObjectProjection = `
  _type == 'casino-table-object' => {
    _type,
    _id,
    _key,
    toplist-> {
        ${toplistProjection}
    },
    count
  }
`
