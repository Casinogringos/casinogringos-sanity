import ModularContent from '@/src/types'

export interface Page<T, I> {
  _id: string
  _type: T
  title: string
  slug: {
    current: string
  }
  attachedItem: I
  content: ModularContent
}
