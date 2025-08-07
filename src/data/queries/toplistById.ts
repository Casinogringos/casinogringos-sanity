import { casinoPagePreviewProjection } from '@/src/data/projections'

export const toplistByIdQuery = ({ id }: { id: string }) => `
    *[_type == 'toplists' && _id == '${id}'][0] {
        _id,
        title,
        casinos[] {
            ${casinoPagePreviewProjection}
        }
    }
`