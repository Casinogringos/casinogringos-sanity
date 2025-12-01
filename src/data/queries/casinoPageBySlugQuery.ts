import { casinoPageProjection } from '@/src/data/projections/casinoPageProjection'

export const casinoPageBySlugQuery = ({ slug }: { slug: string }) => `
    *[_type == 'casino-pages' && !(_id match "drafts.*") && slug.current == '${slug}'] {
      ${casinoPageProjection}
    }
`
