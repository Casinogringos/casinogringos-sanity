import { headingObjectProjection } from '@/src/data/projections/headingObjectProjection'
import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { paragraphObjectProjection } from '@/src/data/projections/paragraphObjectProjection'

export const listItemObjectProjection = `
    _type,
    _key,
    _id,
    message,
    content[] {
        ${headingObjectProjection},
        ${paragraphObjectProjection},
        ${imageObjectProjection}
    }
    
`
