import { casinoPageProjection } from '@/src/data/projections/casinoPageProjection'
import { objectProjections } from '@/src/data/projections/objectProjections'

export const casinoPagesQuery = ({
  count,
  content = true,
}: {
  count: number
  content?: boolean
}) => `
  *[_type == 'casino-pages' && !(_id match "drafts.*") && [0...${count}] {
    ...${casinoPageProjection}
    content[] {
      ${content ? objectProjections : ''}
    }
  }
`
