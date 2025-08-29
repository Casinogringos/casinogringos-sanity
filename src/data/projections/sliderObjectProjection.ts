import { casinoPagePreviewProjection } from './casinoPagePreviewProjection'
import { pagePreviewProjection } from './pagePreviewProjection'
import { newsPagePreviewProjection } from './newsPagePreviewProjection'
import { slotPagePreviewProjection } from './slotPagePreviewProjection'
import { guidePagePreviewProjection } from './guidePagePreviewProjection'

export const sliderObjectProjection = `
  _type == 'slider-object' => {
    _type,
    _key,
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
