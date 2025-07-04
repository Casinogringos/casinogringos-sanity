import { casinoProjection } from '@/src/data/projections'

export const casinoObjectProjection = `
  _type == 'casino-object' => {
    _type,
    _id,
    _key,
    casino-> {
        ${casinoProjection}
    },
    message,
    offer,
    description,
    buttonText
  }
`
