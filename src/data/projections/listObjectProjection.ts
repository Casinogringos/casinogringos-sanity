import { listItemObjectProjection } from '@/src/data/projections'

export const listObjectProjection = `
    _type
    _id
    message
    items {
        ...listItemObjectProjection
    }
    ${listItemObjectProjection}
`
