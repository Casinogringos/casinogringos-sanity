import { headingObjectProjection } from '@/src/data/projections'

export const columnObjectProjection = `
  _type == 'column-object' => {
    _type,
    _id,
    width,
    className,
    column {
        ${headingObjectProjection}
    },
    message
  }
`
