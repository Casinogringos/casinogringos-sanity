import { faqItemObjectProjection } from '@/src/data/projections/faqItemObjectProjection'

export const faqObjectProjection = `
  _type == 'faq-object' => {
    _type,
    _id,
    _key,
    description,
    items[] {
        ${faqItemObjectProjection}
    },
    message
  }
`
