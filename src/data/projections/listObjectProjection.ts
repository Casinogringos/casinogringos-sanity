import { listItemObjectProjection } from '@/src/data/projections/listItemObjectProjection'

export const listObjectProjection = `
  _type == 'list-object' => {
    _type,
    _id,
    _key,
    message,
    numbered,
    items[] {
        ${listItemObjectProjection}
    }   
  }
`
