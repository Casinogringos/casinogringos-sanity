import { BasePage, ModularContent } from '@/src/types'

export type NewsPage<C = true> = BasePage & {
  _type: 'news-pages'
} & (C extends true
    ? {
        content: ModularContent
      }
    : {})
