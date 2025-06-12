import { PortableTextBlock } from 'next-sanity'
import { FaqItemObject } from '@/src/types'

export type FAQObject = {
  _type: 'faq-object'
  _key: string
  message: string
  description: PortableTextBlock
  items: FaqItemObject[]
}
