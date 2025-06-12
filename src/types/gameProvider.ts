import {
  DashboardImageObject,
  GameProviderFeatures,
  GameType,
} from '@/src/types'

export type GameProvider = {
  _type: 'game-providers'
  _key: string
  name: string
  slug: {
    current: string
  }
  yearLaunched: number
  headquarters: string
  swedishLicense: boolean
  featuredImage: DashboardImageObject
  typesOfGames: GameType[]
  numberOfGames: number
  uniqueFeatures: GameProviderFeatures[]
  advantages: string[]
  disadvantages: string[]
  publishedAt: string
}
