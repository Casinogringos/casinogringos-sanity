import { PortableTextBlock } from 'next-sanity'

export type RatingObject = {
  _type: 'rating-object'
  _key: string
  message: string
  rating: string
  motivation: PortableTextBlock[]
  title: string
}
