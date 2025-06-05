import { authorProjection } from '@/src/data/projections'

export const prosAndConsObjectProjection = `
  _type == 'pros-and-cons-object' => {
    _type,
    _id,
    message,
    author {
        ...authorProjection
    },
    consTitle,
    prosTitle,
    cons,
    pros,
    product
    ${authorProjection}
  }
`
