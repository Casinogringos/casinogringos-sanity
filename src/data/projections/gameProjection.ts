import { gameTypeProjection } from '@/src/data/projections/gameTypeProjection'

export const gameProjection = `
  _type,
  _id,
  name,
  slug {
    _type,
    current
  },
  gameType-> {
    ${gameTypeProjection}
  },
  _updatedAt,
  _createdAt
`
