import { BasePage, ModularContent } from '@/src/types'

export type CasinoPage<C = true> = BasePage & {
  _type: 'casino-pages'
} & (C extends true
    ? {
        content: ModularContent
      }
    : null)
