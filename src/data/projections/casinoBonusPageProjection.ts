import { bonusTypeProjection } from '@/src/data/projections/bonusTypeProjection'
import { paymentMethodProjection } from '@/src/data/projections/paymentMethodProjection'
import { casinoBonusProjection } from '@/src/data/projections/casinoBonusProjection'
import { affLinkProjection } from '@/src/data/projections/affLinkProjection'

export const casinoBonusPageProjection = `
    _type,
    _id,
    casinoBonus-> {
      ${casinoBonusProjection}
    },
    affLink-> {
      ${affLinkProjection}
    }
`
