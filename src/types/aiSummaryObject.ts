import { PortableTextBlock } from 'next-sanity'

export interface AISummaryObject {
  _type: 'ai-summary-object'
  _key: string
  title: string
  message: string
  content: PortableTextBlock[]
}
