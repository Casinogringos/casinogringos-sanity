import { imageProjection } from '@/src/data/projections'

export const authorProjection = `
    _type,
    _id,
    _key,
    slug {
      current,
      _type,
    },
    firstName,
    lastName,
    role,
    email,
    linkedIn,
    avatar {
      ${imageProjection}
    },
`
