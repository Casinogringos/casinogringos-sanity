import { ListItemObject } from '@/src/types'

export type ListObject = {
  _type: 'list-object'
  _key: string
  message: string
  items: ListItemObject[]
}
