import { authorProjection } from '@/src/data/projections/authorProjection'

export const prosAndConsObjectProjection = `
  _type == 'pros-and-cons-object' => {
    _type,
    _id,
    _key,
    message,
    author {
        ${authorProjection}
    },
    consTitle,
    prosTitle,
    cons,
    pros,
    product
  }
`
