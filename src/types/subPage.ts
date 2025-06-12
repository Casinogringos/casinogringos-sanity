import { ModularContent } from '@/src/types'

export type SubPage<C = true> = {
  _type: 'sub-page'
  _key: string
  title: string
  slug: string
} & (C extends true
  ? {
      content: ModularContent
    }
  : null)
