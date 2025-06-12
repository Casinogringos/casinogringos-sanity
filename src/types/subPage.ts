import { ModularContent, BasePage } from '@/src/types'

export type SubPage<C = true> = BasePage & {
  _type: 'sub-page'
} & (C extends true
    ? {
        content: ModularContent
      }
    : null)
