import { PortableTextBlock } from 'next-sanity'
import { SanityImage } from '@/src/types'

export type HowToStepObject = {
  _type: 'how-to-step-object'
  message: string
  image: SanityImage
  title: string
  description: PortableTextBlock[]
}
