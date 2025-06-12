import { PortableTextBlock } from 'next-sanity'

export type FaqItemObject = {
  _type: 'faq-item-object'
  _key: string
  message: string
  question: string
  answer: PortableTextBlock[]
}
