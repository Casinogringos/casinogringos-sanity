import { headingObjectProjection } from '@/src/data/projections/headingObjectProjection'
import { listObjectProjection } from '@/src/data/projections/listObjectProjection'
import { paragraphObjectProjection } from '@/src/data/projections/paragraphObjectProjection'
import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { buttonObjectProjection } from '@/src/data/projections/buttonObjectProjection'
import { buttonsObjectProjection } from '@/src/data/projections/buttonsObjectProjection'

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
