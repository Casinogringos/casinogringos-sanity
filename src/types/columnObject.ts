import { ModularContent } from '@/src/types'

export type ColumnObject = {
  _type: 'column-object'
  _key: string
  message: string
  width: string
  className: string
  column: ModularContent
}
