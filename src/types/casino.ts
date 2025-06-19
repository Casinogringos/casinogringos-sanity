import { DashboardImageObject } from '@/src/types'

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
}
