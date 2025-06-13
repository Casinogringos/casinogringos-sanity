import { columnObjectProjection } from '@/src/data/projections'

export const columnsObjectProjection = `
  _type == 'columns-object' => {
    _type,
    _id,
    _key,
    columns[] {
        ${columnObjectProjection}
    },
    message  
  }
`
