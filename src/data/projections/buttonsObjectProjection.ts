import { buttonObjectProjection } from '@/src/data/projections'

export const buttonsObjectProjection = `
  _type == 'buttons-object' => {
    _type,
    _id,
    _key,
    buttons[] {
        ${buttonObjectProjection}
    },
    message
  }
`
