import { imageProjection } from '@/src/data/projections'

export const howToStepObjectProjection = `
    _type,
    _id,
    message,
    image {
        ${imageProjection}
    },
    title,
    description
`
