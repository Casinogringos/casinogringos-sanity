import {
  ParagraphObject,
  ColumnsObject,
  HowToObject,
  HeadingObject,
  ImageObject,
  FAQObject,
  CasinoObject,
  BonusObject,
  ProsAndConsObject,
} from '@/src/types'

export interface GroupObject {
  _type: 'group-object'
  _key: string
  variant: 'success'
  content: [
    ParagraphObject,
    HeadingObject,
    ImageObject,
    ColumnsObject,
    HowToObject,
    FAQObject,
    CasinoObject,
    BonusObject,
    ProsAndConsObject,
  ]
}
