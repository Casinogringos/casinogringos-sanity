import { PortableTextBlock } from 'next-sanity'
import { HowToStepObject } from '@/src/types'

export type HowToObject = {
  _type: 'how-to-object'
  _key: string
  message: string
  description: PortableTextBlock
  steps: HowToStepObject[]
  unorderedList: boolean
  hasDuration: boolean
  days: number
  hours: number
  minutes: number
  seconds: number
}
