import { headingObjectProjection } from '@/src/data/projections'

export const listItemObjectProjection = `
    _type
    _id
    message
    content {
        ...headingObjectProjection
    }
    ${headingObjectProjection}
`
