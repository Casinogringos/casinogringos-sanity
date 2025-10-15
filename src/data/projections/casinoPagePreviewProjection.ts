import { casinoProjection } from '@/src/data/projections/casinoProjection'
import { imageProjection } from './imageProjection'
import { authorProjection } from './authorProjection'
import { affLinkProjection } from './affLinkProjection'
import { casinoBonusPageProjection } from './casinoBonusPageProjection'
import { oddsBonusPageProjection } from './oddsBonusPageProjection'
import { liveCasinoBonusPageProjection } from './liveCasinoBonusPageProjection'
import { freeSpinsPageProjection } from './freeSpinsPageProjection'

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
  casinoBonuses[] -> {
    ${casinoBonusPageProjection}
  },
  oddsBonuses[] -> {
    ${oddsBonusPageProjection}
  },
  liveCasinoBonuses[] -> {
    ${liveCasinoBonusPageProjection}
  },
  freeSpins[] -> {
    ${freeSpinsPageProjection}
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