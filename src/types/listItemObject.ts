import { ModularContent } from '@/src/types'

export type ListItemObject = {
  _type: 'list-item-object'
  _key: string
  message: string
  content: ModularContent
}
