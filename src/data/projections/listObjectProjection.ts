import { listItemObjectProjection } from '@/src/data/projections/listItemObjectProjection'
import { imageProjection } from './imageProjection'

export const listObjectProjection = `
  _type == 'list-object' => {
    _type,
    _id,
    _key,
    message,
    numbered,
    showIcon,
    icon {
      ${imageProjection}
    },
    items[] {
      ${listItemObjectProjection}
    }   
  }
`
