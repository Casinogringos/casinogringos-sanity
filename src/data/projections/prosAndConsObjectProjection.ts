import { authorProjection } from '@/src/data/projections'

export const prosAndConsObjectProjection = `
    _type
    _id
    message
    author {
        ...authorProjection
    }
    consTitle
    prosTitle
    cons
    pros
    product
    ${authorProjection}
`
