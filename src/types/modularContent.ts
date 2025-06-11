import {
  RenderedHtmlBlock,
  BlockLabCasinoBlock,
  BlockLabAffiliateButtonBlock,
  ParagraphObject,
  CoreHeadingBlock,
  CoreImageBlock,
  CoreEmbedBlock,
  ColumnsObject,
  CoreGroupBlock,
  YoastHowToBlock,
  YoastFaqBlock,
  FAQObject,
  HeadingObject,
  ImageObject,
  FlamingoAISummaryBlock,
  FlamingoToggleBlock,
  HowToObject,
  FlamingoCasinoBlock,
  BonusObject,
} from '@/src/types/index'

export type ModularContent = Array<
  | RenderedHtmlBlock
  | BlockLabCasinoBlock
  | BlockLabAffiliateButtonBlock
  | ParagraphObject
  | CoreHeadingBlock
  | CoreImageBlock
  | CoreEmbedBlock
  | ColumnsObject
  | CoreGroupBlock
  | YoastHowToBlock
  | YoastFaqBlock
  | FAQObject
  | HeadingObject
  | ImageObject
  | FlamingoAISummaryBlock
  | FlamingoToggleBlock
  | HowToObject
  | FlamingoCasinoBlock
  | BlockLabAffiliateButtonBlock
  | BonusObject
>
