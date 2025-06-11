import { PortableTextBlock } from 'next-sanity'

export interface ProsAndConsObject {
  _type: 'pros-and-cons-object'
  _key: string
  _id: string
  author: Author
  consTitle: string
  cons: PortableTextBlock[]
  prosTitle: string
  pros: PortableTextBlock[]
  product: string
}
