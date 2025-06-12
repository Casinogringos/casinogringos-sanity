import { PortableTextBlock } from 'next-sanity'

export type ParagraphObject = {
  _type: 'paragraph-object'
  _key: string
  message: string
  className: string
  content: PortableTextBlock[]
}
