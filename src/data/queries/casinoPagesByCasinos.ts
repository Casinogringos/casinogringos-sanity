import { casinoPagePreviewProjection } from '@/src/data/projections/casinoPagePreviewProjection'

export const casinoPagesByCasinosQuery = ({ casinoIds }: { casinoIds: string[] }) => `
    *[_type == 'casino-pages' && casino._id in ${casinoIds}][0..24] {
      ${casinoPagePreviewProjection}
    }
`
