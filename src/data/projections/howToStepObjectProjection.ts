import { imageProjection } from '@/src/data/projections/imageProjection'

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
