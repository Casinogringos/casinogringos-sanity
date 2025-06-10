import { casinoPageProjection } from '@/src/data/projections'

export const casinoPageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'casino-pages' && slug.current == '${slug}'] {
      ${casinoPageProjection}
    }
`
