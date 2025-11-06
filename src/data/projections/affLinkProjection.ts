import { imageProjection } from '@/src/data/projections/imageProjection'

export const affLinkProjection = `
  _type,
  _id,
  title,
  slug {
    current
  },
  link,
`
