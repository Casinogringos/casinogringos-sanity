import { SanityImage } from '@/src/types'

export interface ImageObject {
  _type: 'image-object'
  _key: string
  _id: string
  message: string
  image: SanityImage
  caption: string
  altText: string
  internalLink: {
    _type: string
    slug: string
  }
  externalLink: string
}
