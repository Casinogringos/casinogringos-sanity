import { menuProjection } from '@/src/data/projections/menuProjection'

export const menuByIdQuery = ({ id }: { id: string }) => `
    *[_type == 'menus' && _id == '${id}'][0] {
      ${menuProjection}
    }
`
