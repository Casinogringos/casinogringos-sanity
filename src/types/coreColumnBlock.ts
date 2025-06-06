import {
  RenderedHtmlBlock,
  CoreImageBlock,
  CoreHeadingBlock,
  YoastHowToBlock,
  ParagraphObject,
} from '@/src/types/index'

export type CoreColumnBlock = {
  __typename: 'CoreColumn'
  attributes: {
    columnWidth: number
    className: string
  }
  innerBlocks: [
    ParagraphObject,
    CoreHeadingBlock,
    RenderedHtmlBlock,
    CoreImageBlock,
    YoastHowToBlock,
  ]
}
