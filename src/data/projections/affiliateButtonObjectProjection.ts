import { casinoProjection } from '@/src/data/projections'

export const affiliateButtonObjectProjection = `
  _type == 'affiliate-button-object' => {
    _type,
    _id,
    casino-> {
        ${casinoProjection}
    },
    message
  }
`
