import { ModularContent } from '@/src/types'

export type ToggleObject = {
  _type: 'toggle-object'
  _key: string
  message: string
  buttonTextOpen: string
  buttonTextClose: string
  buttonText: string
  content: ModularContent
}
