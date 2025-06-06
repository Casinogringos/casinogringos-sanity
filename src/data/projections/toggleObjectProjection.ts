import { imageObjectProjection } from '@/src/data/projections'
import { headingObjectProjection } from '@/src/data/projections'
import { paragraphObjectProjection } from '@/src/data/projections'

export const toggleObjectProjection = `
  _type == 'toggle-object' => {
    _type,
    _id,
    buttonTextOpen,
    buttonTextClose,
    message,
    content[] {
        ${headingObjectProjection},
        ${paragraphObjectProjection},
        ${imageObjectProjection}
    }
  }
`
