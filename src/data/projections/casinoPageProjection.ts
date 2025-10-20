import { casinoProjection } from '@/src/data/projections/casinoProjection'
import { objectProjections } from '@/src/data/projections/objectProjections'
import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { authorProjection } from '@/src/data/projections/authorProjection'
import { affLinkProjection } from '@/src/data/projections/affLinkProjection'
import { casinoBonusPageProjection } from './casinoBonusPageProjection'
import { oddsBonusPageProjection } from './oddsBonusPageProjection'
import { liveCasinoBonusPageProjection } from './liveCasinoBonusPageProjection'
import { freeSpinsPageProjection } from './freeSpinsPageProjection'

export const casinoPageProjection = `
  _type,
  _id,
  _key,
  title,
  slug {
    current
  },
  affLink -> {
    ${affLinkProjection}
  },
  casinoBonusPages[] -> {
    ${casinoBonusPageProjection}
  },
  oddsBonusPages[] -> {
    ${oddsBonusPageProjection}
  },
  liveCasinoBonusPages[] -> {
    ${liveCasinoBonusPageProjection}
  },
  freeSpinsPages[] -> {
    ${freeSpinsPageProjection}
  },
  intro,
  publishedAt,
  featuredImage {
    ${imageObjectProjection}
  },
  seoTitle,
  ratingMotivation,
  canonical,
  seoDescription,
  seoImage {
    ${imageObjectProjection}
  },
  casino-> {
    ${casinoProjection}
  },
  content[] {
    ${objectProjections}
  },
  author-> {
    ${authorProjection}
  },
  _updatedAt,
  _createdAt
`
