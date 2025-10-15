import { liveCasinoBonusProjection } from '@/src/data/projections/liveCasinoBonusProjection'
import { affLinkProjection } from '@/src/data/projections/affLinkProjection'

export const liveCasinoBonusPageProjection = `
    _type,
    _id,
    liveCasinoBonus-> {
      ${liveCasinoBonusProjection}
    },
    affLink-> {
      ${affLinkProjection}
    }
`