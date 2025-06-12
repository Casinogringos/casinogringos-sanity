import { BasePage, ModularContent } from '@/src/types'

export type GuidePage<C = true> = BasePage & {
  _type: 'guide-page'
} & (C extends true
    ? {
        content: ModularContent
      }
    : null)
