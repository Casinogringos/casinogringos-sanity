import { columnObjectProjection } from '@/src/data/projections'

export const columnsObjectProjection = `
    _type
    _id
    columns {
        ...columnObjectProjection
    }
    message
    ${columnObjectProjection}
`
