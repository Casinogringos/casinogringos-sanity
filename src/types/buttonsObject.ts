import { ButtonObject } from '@/src/types'

export type ButtonsObject = {
  _type: 'buttons-object'
  _key: string
  message: string
  buttons: ButtonObject[]
}
