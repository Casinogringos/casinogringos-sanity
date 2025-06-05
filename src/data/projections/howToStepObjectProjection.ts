import { imageObjectProjection } from '@/src/data/projections'

export const howToStepObjectProjection = `
    _type,
    _id,
    message,
    image {
        ...imageObjectProjection
    },
    title,
    description
    ${imageObjectProjection}
`
