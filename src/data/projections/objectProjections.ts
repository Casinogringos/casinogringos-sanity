import { casinoObjectProjection } from '@/src/data/projections/casinoObjectProjection'
import { affiliateButtonObjectProjection } from '@/src/data/projections/affiliateButtonObjectProjection'
import { aiSummaryObjectProjection } from '@/src/data/projections/aiSummaryObjectProjection'
import { bonusObjectProjection } from '@/src/data/projections/bonusObjectProjection'
import { buttonObjectProjection } from '@/src/data/projections/buttonObjectProjection'
import { buttonsObjectProjection } from '@/src/data/projections/buttonsObjectProjection'
import { embedObjectProjection } from '@/src/data/projections/embedObjectProjection'
import { faqObjectProjection } from '@/src/data/projections/faqObjectProjection'
import { groupObjectProjection } from '@/src/data/projections/groupObjectProjection'
import { columnObjectProjection } from '@/src/data/projections/columnObjectProjection'
import { columnsObjectProjection } from '@/src/data/projections/columnsObjectProjection'
import { headingObjectProjection } from '@/src/data/projections/headingObjectProjection'
import { listObjectProjection } from '@/src/data/projections/listObjectProjection'
import { paragraphObjectProjection } from '@/src/data/projections/paragraphObjectProjection'
import { quoteObjectProjection } from '@/src/data/projections/quoteObjectProjection'
import { ratingObjectProjection } from '@/src/data/projections/ratingObjectProjection'
import { toggleObjectProjection } from '@/src/data/projections/toggleObjectProjection'
import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { howToObjectProjection } from '@/src/data/projections/howToObjectProjection'
import { shortcodeObjectProjection } from '@/src/data/projections/shortcodeObjectProjection'
import { oldTableObjectProjection } from '@/src/data/projections/oldTableObjectProjection'
import { prosAndConsObjectProjection } from '@/src/data/projections/prosAndConsObjectProjection'
import { casinoListObjectProjection } from '@/src/data/projections/casinoListObjectProjection'
import { slotListObjectProjection } from '@/src/data/projections/slotListObjectProjection'

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
  slotListObjectProjection,
]
  .map((projection) => projection.trim())
  .join(',\n')
