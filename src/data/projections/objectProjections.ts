import { casinoObjectProjection } from '@/src/data/projections'
import { affiliateButtonObjectProjection } from '@/src/data/projections'
import { aiSummaryObjectProjection } from '@/src/data/projections'
import { bonusObjectProjection } from '@/src/data/projections'
import { buttonObjectProjection } from '@/src/data/projections'
import { buttonsObjectProjection } from '@/src/data/projections'
import { embedObjectProjection } from '@/src/data/projections'
import { faqObjectProjection } from '@/src/data/projections'
import { groupObjectProjection } from '@/src/data/projections'
import { columnObjectProjection } from '@/src/data/projections'
import { columnsObjectProjection } from '@/src/data/projections'
import { headingObjectProjection } from '@/src/data/projections'
import { listObjectProjection } from '@/src/data/projections'
import { paragraphObjectProjection } from '@/src/data/projections'
import { quoteObjectProjection } from '@/src/data/projections'
import { ratingObjectProjection } from '@/src/data/projections'
import { toggleObjectProjection } from '@/src/data/projections'
import { imageObjectProjection } from '@/src/data/projections'
import { howToObjectProjection } from '@/src/data/projections'
import { shortcodeObjectProjection } from '@/src/data/projections'
import { oldTableObjectProjection } from '@/src/data/projections'
import { prosAndConsObjectProjection } from '@/src/data/projections'
import { casinoListObjectProjection } from '@/src/data/projections'

// export const objectProjections = `
//     ${casinoObjectProjection},
//     ${buttonsObjectProjection},
//     ${affiliateButtonObjectProjection},
//     ${aiSummaryObjectProjection},
//     ${bonusObjectProjection},
//     ${buttonObjectProjection},
//     ${embedObjectProjection},
//     ${faqObjectProjection},
//     ${groupObjectProjection},
//     ${columnObjectProjection},
//     ${columnsObjectProjection},
//     ${ratingObjectProjection},
//     ${headingObjectProjection},
//     ${listObjectProjection},
//     ${paragraphObjectProjection},
//     ${quoteObjectProjection},
//     ${toggleObjectProjection}
// `

export const objectProjections = [
  casinoObjectProjection,
  buttonsObjectProjection,
  affiliateButtonObjectProjection,
  aiSummaryObjectProjection,
  bonusObjectProjection,
  buttonObjectProjection,
  embedObjectProjection,
  casinoListObjectProjection,
  faqObjectProjection,
  groupObjectProjection,
  columnObjectProjection,
  columnsObjectProjection,
  ratingObjectProjection,
  headingObjectProjection,
  listObjectProjection,
  paragraphObjectProjection,
  quoteObjectProjection,
  toggleObjectProjection,
  imageObjectProjection,
  howToObjectProjection,
  shortcodeObjectProjection,
  oldTableObjectProjection,
  prosAndConsObjectProjection,
]
  .map((projection) => projection.trim())
  .join(',\n')
