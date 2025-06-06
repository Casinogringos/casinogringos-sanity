import { headingObjectProjection } from '@/src/data/projections'

export const groupObjectProjection = `
  _type == 'group-object' => {
    _type,
    _key,
    width,
    className,
    content[] {
         ${headingObjectProjection}
    },
    message
  }
`
