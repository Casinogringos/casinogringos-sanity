import { casinoProjection } from '@/src/data/projections/casinoProjection'

export const toplistByIdQuery = ({ id }: { id: string }) => `
    *[_type == 'toplists' && _id == '${id}'][0] {
        _id,
        title,
        casinos[]-> {
            ${casinoProjection}
        }
    }
`
