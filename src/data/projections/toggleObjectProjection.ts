import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { headingObjectProjection } from '@/src/data/projections/headingObjectProjection'
import { paragraphObjectProjection } from '@/src/data/projections/paragraphObjectProjection'

export const toggleObjectProjection = `
  _type == 'toggle-object' => {
    _type,
    _id,
    _key,
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
