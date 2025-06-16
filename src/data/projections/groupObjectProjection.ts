import {
  buttonObjectProjection,
  buttonsObjectProjection,
  headingObjectProjection,
  imageObjectProjection,
  listObjectProjection,
  paragraphObjectProjection,
} from '@/src/data/projections'

export const groupObjectProjection = `
  _type == 'group-object' => {
    _type,
    _key,
    width,
    className,
    content[] {
         ${headingObjectProjection},
         ${listObjectProjection},
         ${paragraphObjectProjection},
         ${imageObjectProjection},
         ${buttonObjectProjection},
         ${buttonsObjectProjection},
    },
    message
  }
`
