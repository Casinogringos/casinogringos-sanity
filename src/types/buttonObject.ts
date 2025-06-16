import { CasinoPage, GuidePage, NewsPage, SlotPage, SubPage } from '@/src/types'

export type ButtonObject = {
  _type: 'button-object'
  _key: string
  message: string
  title: string
  uri: {
    current: string
  }
  page:
    | SubPage<false>
    | CasinoPage<false>
    | SlotPage<false>
    | GuidePage<false>
    | NewsPage<false>
}
