import { affLinkProjection } from '@/src/data/projections/affLinkProjection'
import { authorProjection } from '@/src/data/projections/authorProjection'
import { casinoProjection } from '@/src/data/projections/casinoProjection'
import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { objectProjections } from '@/src/data/projections/objectProjections'
import { casinoBonusPageProjection } from './casinoBonusPageProjection'
import { freeSpinsPageProjection } from './freeSpinsPageProjection'
import { liveCasinoBonusPageProjection } from './liveCasinoBonusPageProjection'
import { oddsBonusPageProjection } from './oddsBonusPageProjection'

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
  _createdAt,
  _updatedAt,
  originalPublishedAt,
  originalModifiedAt,
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
`
