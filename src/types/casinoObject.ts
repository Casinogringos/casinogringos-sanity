import { PortableTextBlock } from 'next-sanity'
import { Casino } from '@/src/types'

export type CasinoObject = {
  _type: 'casino-object'
  _key: string
  message: string
  casino: Casino
  offer: PortableTextBlock
  description: PortableTextBlock
  buttonText: string
}
