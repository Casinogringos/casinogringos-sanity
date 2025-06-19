import { PortableTextBlock } from 'next-sanity'
import { Casino } from '@/src/types'

export type Toplist = {
  title: string
  description: PortableTextBlock[]
  casinos: Casino[]
}
