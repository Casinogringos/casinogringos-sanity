import { BasePage, ModularContent } from '@/src/types'

export type SlotPage<C = true> = BasePage & {
  _type: 'slot-pages'
} & (C extends true
    ? {
        content: ModularContent
      }
    : {})
