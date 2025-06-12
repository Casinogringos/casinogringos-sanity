import { PortableTextBlock } from 'next-sanity'

export type QuoteObject = {
  _type: 'quote-object'
  _key: string
  message: string
  content: PortableTextBlock[]
}
