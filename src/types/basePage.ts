import { PortableTextBlock } from 'next-sanity'
import { Author, ImageObject, Toplist } from '@/src/types'

export interface BasePage {
  _id: string
  _type: string
  _key: string
  title: string
  publishedAt: string
  slug: {
    current: string
  }
  excerpt: PortableTextBlock[]
  featuredImage: ImageObject
  intro: PortableTextBlock[]
  author: Author
  modifiedAt: string
  reviewer: Author
  faqs: {
    question: string
    answer: string
    message: string
  }[]
  toplist: Toplist
}
