import { faqItemObjectProjection } from '@/src/data/projections'

export const faqObjectProjection = `
  _type == 'faq-object' => {
    _type,
    _id,
    description,
    items {
        ${faqItemObjectProjection}
    },
    message
  }
`
