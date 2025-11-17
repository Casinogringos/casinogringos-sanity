import { imageProjection } from './imageProjection'
import { imageObjectProjection } from './imageObjectProjection'
import { authorProjection } from './authorProjection'
import { faqItemObjectProjection } from './faqItemObjectProjection'
import { toplistProjection } from './toplistProjection'
import { objectProjections } from './objectProjections'

export const pageProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  originalPublishedAt,
  originalModifiedAt,
  _createdAt,
  _updatedAt,
  seoTitle,
  seoDescription,
  seoImage {
    ${imageProjection}
  },
  canonical,
  intro,
  author-> {
    ${authorProjection}
  },
  reviewer-> {
    ${authorProjection}
  },
  featuredImage {
    ${imageObjectProjection}
  },
  faqs {
    title,
    description,
    items[] {
      ${faqItemObjectProjection}
    }
  },
  toplistTitle,
  toplist-> {
    ${toplistProjection}
  },
  bonusCategory[] {
    _type,
    value
  },
  content[] {
    ${objectProjections}
  }
`
