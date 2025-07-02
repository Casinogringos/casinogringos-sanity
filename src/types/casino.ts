import { CasinoBonus, DashboardImageObject, FreeSpins } from '@/src/types'

export type Casino = {
  _type: 'casinos'
  _id: string
  _key: string
  logo: DashboardImageObject
  slug: {
    _type: 'slug'
    current: string
  }
  name: string
  brandColor: string
  overallRating: number
  casinoBonuses: CasinoBonus[]
  freeSpins: FreeSpins[]
  advantages: string[]
}
