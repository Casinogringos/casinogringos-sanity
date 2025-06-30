import { PortableTextBlock } from 'next-sanity'
import { CasinoPage } from '@/src/types'

export type Toplist = {
  title: string
  description: PortableTextBlock[]
  casinos: CasinoPage[]
}
