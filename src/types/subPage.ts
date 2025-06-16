import { ModularContent, BasePage } from '@/src/types'

export type SubPage<C = true> = BasePage & {
  _type: 'pages'
} & (C extends true
    ? {
        content: ModularContent
      }
    : {})
