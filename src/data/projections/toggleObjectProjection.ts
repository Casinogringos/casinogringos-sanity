import { headingObjectProjection } from '@/src/data/projections'
import { paragraphObjectProjection } from '@/src/data/projections'
import { imageObjectProjection } from '@/src/data/projections'

export const toggleObjectProjection = `
    _type
    _id
    buttonTextOpen
    buttonTextClose
    message
    content {
        ...headingObjectProjection
        ...paragraphObjectProjection
        ...imageObjectProjection
    }
    ${headingObjectProjection}
    ${paragraphObjectProjection}
    ${imageObjectProjection}
`
