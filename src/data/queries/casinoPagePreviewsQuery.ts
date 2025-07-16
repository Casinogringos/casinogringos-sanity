import { casinoProjection, objectProjections } from '@/src/data/projections'

export const casinoPagePreviewsQuery = ({
  count,
  content = true,
}: {
  count: number
  content?: boolean
}) => `
  *[_type == 'casino-pages' && [0...${count}] {
    casino-> {
      ${casinoProjection}
    }
    content[] {
      ${content ? objectProjections : ''}
    }
  }
`
