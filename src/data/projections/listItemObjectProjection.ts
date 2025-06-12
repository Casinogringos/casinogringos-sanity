import {
  headingObjectProjection,
  imageObjectProjection,
  paragraphObjectProjection,
} from '@/src/data/projections'

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
