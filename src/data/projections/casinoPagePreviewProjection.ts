import { casinoProjection } from '@/src/data/projections/casinoProjection'
import { imageProjection } from './imageProjection'
import { authorProjection } from './authorProjection'

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

export const getCasinoPagePreviewProjection = ({ author }: { author?: boolean }): string => {
  return `
    ${casinoPagePreviewProjection},
    ${author ? `author-> {
      ${authorProjection}
    }` : ''}
  `
}