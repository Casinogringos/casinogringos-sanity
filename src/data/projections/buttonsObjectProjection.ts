import { buttonObjectProjection } from '@/src/data/projections'

export const buttonsObjectProjection = `
    _type
    _id
    buttons {
        ...buttonObjectProjection
    }
    message
    ${buttonObjectProjection}
`
