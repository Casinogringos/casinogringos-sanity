import { casinoProjection } from '@/src/data/projections'

export const casinoObjectProjection = `
  _type == 'casino-object' => {
    _type,
    _id,
    casino {
        ${casinoProjection}
    },
    message,
    offer,
    description,
    buttonText
  }
`
