import { headingObjectProjection } from '@/src/data/projections'

export const groupObjectProjection = `
  _type == 'group-object' => {
    _type,
    _id,
    width,
    className,
    content {
         ${headingObjectProjection}
    },
    message
  }
`
