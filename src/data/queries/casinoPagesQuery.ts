import { casinoPageProjection, objectProjections } from '@/src/data/projections'

export const casinoPagesQuery = ({
  count,
  content = true,
}: {
  count: number
  content?: boolean
}) => `
  *[_type == 'casino-pages' && [0...${count}] {
    ...${casinoPageProjection}
    content[] {
      ${content ? objectProjections : ''}
    }
  }
`
