import { oddsBonusProjection } from '@/src/data/projections/oddsBonusProjection'
import { affLinkProjection } from '@/src/data/projections/affLinkProjection'

export const oddsBonusPageProjection = `
    _type,
    _id,
    _key,
    oddsBonus-> {
      ${oddsBonusProjection}
    },
    affLink-> {
      ${affLinkProjection}
    }
`
