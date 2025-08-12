import { dashboardImageProjection } from '@/src/data/projections/dashboardImageProjection'
import { gameTypeProjection } from '@/src/data/projections/gameTypeProjection'
import { gameProviderFeaturesProjection } from '@/src/data/projections/gameProviderFeaturesProjection'

export const gameProviderProjection = `
  _type,
  _id,
  _key,
  name,
  slug {
    _type,
    current
  },
  yearLaunched,
  headquarters,
  swedishLicense,
  featuredImage {
    ${dashboardImageProjection}
  },
  typesOfGames->[] {
    ${gameTypeProjection}
  },
  numberOfGames,
  uniqueFeatures->[] {
    ${gameProviderFeaturesProjection}
  },
  advantages[],
  disadvantages[],
  _updatedAt,
  _createdAt
`
