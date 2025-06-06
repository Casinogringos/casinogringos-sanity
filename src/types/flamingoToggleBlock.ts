import { ParagraphObject, HeadingObject, ImageObject } from '@/src/types/index'

export type FlamingoToggleBlock = {
  __typename: 'FlamingoToggle'
  clientId: string
  attributes: {
    buttonTextOpen: string
    buttonTextClose: string
  }
  innerBlocks: [ImageObject, HeadingObject, ParagraphObject]
}
