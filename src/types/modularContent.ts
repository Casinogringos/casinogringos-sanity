import {
  ImageObject,
  AISummaryObject,
  ButtonsObject,
  CasinoObject,
  ColumnsObject,
  FAQObject,
  GroupObject,
  HeadingObject,
  HowToObject,
  ListObject,
  ParagraphObject,
  BonusObject,
  ProsAndConsObject,
  QuoteObject,
  RatingObject,
  ToggleObject,
  TableObject,
  ShortcodeObject,
  AffiliateButtonObject,
} from '@/src/types'

export type ModularContent = Array<
  | AffiliateButtonObject
  | ImageObject
  | AISummaryObject
  | ButtonsObject
  | CasinoObject
  | BonusObject
  | ColumnsObject
  | FAQObject
  | GroupObject
  | HeadingObject
  | HowToObject
  | ListObject
  | ParagraphObject
  | ProsAndConsObject
  | QuoteObject
  | RatingObject
  | ToggleObject
  | TableObject
  | ShortcodeObject
>
