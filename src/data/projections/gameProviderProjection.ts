import { dashboardImageProjection, gameTypeProjection, gameProviderFeaturesProjection } from "@/src/data/projections";

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
