import { BasePage, ModularContent } from '@/src/types'
import { Casino } from '@/src/types'

export type CasinoPage<C = true> = BasePage & {
  _type: 'casino-pages'
  affiliateLink: string
  casino: Casino
} & (C extends true
  ? {
    content: ModularContent
  }
  : {})
