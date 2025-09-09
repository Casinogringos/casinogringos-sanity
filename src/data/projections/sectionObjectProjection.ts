import { headingObjectProjection } from '@/src/data/projections/headingObjectProjection'
import { listObjectProjection } from '@/src/data/projections/listObjectProjection'
import { paragraphObjectProjection } from '@/src/data/projections/paragraphObjectProjection'
import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { buttonObjectProjection } from '@/src/data/projections/buttonObjectProjection'
import { buttonsObjectProjection } from '@/src/data/projections/buttonsObjectProjection'
import { columnsObjectProjection } from './columnsObjectProjection'

export const sectionObjectProjection = `
  _type == 'section-object' => {
    _type,
    _key,
    className,
    backgroundColor,
    size,
    content[] {
         ${headingObjectProjection},
         ${listObjectProjection},
         ${paragraphObjectProjection},
         ${imageObjectProjection},
         ${buttonObjectProjection},
         ${buttonsObjectProjection},
         ${columnsObjectProjection}
    },
    message
  }
`
