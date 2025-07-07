import { ImageObject, NewsPage } from '@/src/types'
import { PortableTextBlock } from 'next-sanity'

export interface Expertise {
  title: string
  years: string
}

export interface Experience {
  title: string
  years: string
}

export interface Author {
  _id: string
  _key: string
  _type: 'authors'
  name: string
  slug: {
    current: string
  }
  title: string
  description: PortableTextBlock[]
  role: string
  email: string
  linkedIn: string
  news: NewsPage[]
  expertise: Expertise[]
  experience: Experience[]
  avatar: ImageObject
  about: PortableTextBlock[]
}
