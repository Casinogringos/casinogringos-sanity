import { casinoPagePreviewProjection } from './casinoPagePreviewProjection'

export const casinoObjectProjection = `
  _type == 'casino-object' => {
    _type,
    _id,
    _key,
    casinoPage-> {
        ${casinoPagePreviewProjection}
    },
    message,
    offer,
    description,
    buttonText
  }
`
