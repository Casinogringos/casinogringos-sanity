import { casinoProjection } from '@/src/data/projections/casinoProjection'
import { imageProjection } from './imageProjection'
import { authorProjection } from './authorProjection'
import { affLinkProjection } from './affLinkProjection'
import { casinoBonusPageProjection } from './casinoBonusPageProjection'
import { oddsBonusPageProjection } from './oddsBonusPageProjection'
import { liveCasinoBonusPageProjection } from './liveCasinoBonusPageProjection'
import { freeSpinsPageProjection } from './freeSpinsPageProjection'
import { casinoBonusProjection } from '@/src/data/projections/casinoBonusProjection'
import { oddsBonusProjection } from '@/src/data/projections/oddsBonusProjection'
import { liveCasinoBonusProjection } from '@/src/data/projections/liveCasinoBonusProjection'
import { freeSpinsProjection } from '@/src/data/projections/freeSpinsProjection'

export const casinoPagePreviewProjection = `
  _type,
  _id,
  title,
  slug {
    _type,
    current
  },
  affLink-> {
    ${affLinkProjection} 
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

export const getCasinoPagePreviewProjection = ({
  author,
}: {
  author?: boolean
}): string => {
  return `
    ${casinoPagePreviewProjection},
    ${author
      ? `author-> {
      ${authorProjection}
    }`
      : ''
    }
  `
}
