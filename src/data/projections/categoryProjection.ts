import { guidePagePreviewProjection } from "./guidePagePreviewProjection";
import { casinoPagePreviewProjection } from "./casinoPagePreviewProjection";
import { pagePreviewProjection } from "./pagePreviewProjection";
import { newsPagePreviewProjection } from "./newsPagePreviewProjection";
import { slotPagePreviewProjection } from "./slotPagePreviewProjection";
import { getGuidePagePreviewProjection } from "./guidePagePreviewProjection";
import { getCasinoPagePreviewProjection } from "./casinoPagePreviewProjection";
import { getPagePreviewProjection } from "./pagePreviewProjection";
import { getNewsPagePreviewProjection } from "./newsPagePreviewProjection";
import { getSlotPagePreviewProjection } from "./slotPagePreviewProjection";

export const categoryProjection = `
    _type,
    _id,
    _key,
    title,
    slug {
      current,
      _type,
    }
`

export const getCategoryProjection = ({ items, author }: { items?: boolean, author?: boolean }): string => {
  return `
        ${categoryProjection},
        ${items ? `
          "items": *[((_type == "casino-pages" || _type == "pages" || _type == "news-pages" || _type == "slot-pages" || _type == "guide-pages")) && references(^._id)] {
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
          },
        ` : ''}
    `
}
