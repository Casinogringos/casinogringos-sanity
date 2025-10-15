import { freeSpinsProjection } from '@/src/data/projections/freeSpinsProjection'
import { affLinkProjection } from '@/src/data/projections/affLinkProjection'

export const freeSpinsPageProjection = `
    _type,
    _id,
    _key,
    freeSpins-> {
      ${freeSpinsProjection}
    },
    affLink-> {
      ${affLinkProjection}
    }
`
