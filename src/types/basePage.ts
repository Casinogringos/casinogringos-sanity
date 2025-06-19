import { PortableTextBlock } from 'next-sanity'
import { Toplist } from '@/src/types'

export interface BasePage {
  _id: string
  _type: string
  _key: string
  title: string
  slug: {
    current: string
  }
  intro: PortableTextBlock[]
  faqs: {
    question: string
    answer: string
    message: string
  }[]
  toplist: Toplist
}
