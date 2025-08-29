import { casinoPagePreviewProjection } from './casinoPagePreviewProjection'
import { pagePreviewProjection } from './pagePreviewProjection'
import { newsPagePreviewProjection } from './newsPagePreviewProjection'
import { slotPagePreviewProjection } from './slotPagePreviewProjection'
import { guidePagePreviewProjection } from './guidePagePreviewProjection'
import { getCategoryProjection } from './categoryProjection'

export const sliderObjectProjection = `
  _type == 'slider-object' => {
    _type,
    _key,
    category-> {
      ${getCategoryProjection({ items: true, author: false })}
    },
    items[]-> {
      _type == 'casino-pages' => {
        ${casinoPagePreviewProjection}
      },
      _type == 'pages' => {
        ${pagePreviewProjection}
      },
      _type == 'news-pages' => {
        ${newsPagePreviewProjection}
      },
      _type == 'slot-pages' => {
        ${slotPagePreviewProjection}
      },
      _type == 'guide-pages' => {
        ${guidePagePreviewProjection}
      }
    }
  }
`
