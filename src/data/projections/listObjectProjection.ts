import { listItemObjectProjection } from '@/src/data/projections'

export const listObjectProjection = `
  _type == 'list-object' => {
    _type,
    _id,
    _key,
    message,
    items[] {
        ${listItemObjectProjection}
    }   
  }
`
