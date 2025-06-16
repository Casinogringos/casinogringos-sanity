import {
  buttonObjectProjection,
  buttonsObjectProjection,
  headingObjectProjection,
  imageObjectProjection,
  listObjectProjection,
  paragraphObjectProjection,
} from '@/src/data/projections'

export const columnObjectProjection = `
  _type == 'column-object' => {
    _type,
    _id,
    _key,
    width,
    className,
    column[] {
        ${headingObjectProjection},
        ${imageObjectProjection},
        ${paragraphObjectProjection},
        ${listObjectProjection},
        ${buttonObjectProjection},
        ${buttonsObjectProjection},
    },
    message
  }
`
