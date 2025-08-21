import { casinoProjection } from '@/src/data/projections/casinoProjection'
import { imageProjection } from './imageProjection'

export const casinoPagePreviewProjection = `
  _type,
  _id,
  title,
  slug {
    _type,
    current
  },
  featuredImage {
    ${imageProjection}
  },
  seoTitle,
  seoDescription,
  casino-> {
    ${casinoProjection}
  }
`
