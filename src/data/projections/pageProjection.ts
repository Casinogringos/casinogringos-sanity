import {
  objectProjections,
  faqItemObjectProjection,
} from '@/src/data/projections'

export const pageProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  publishedAt,
  seoTitle,
  intro,
  seoDescription,
  faqs[] {
    ${faqItemObjectProjection}
  },
  content[] {
    ${objectProjections}
  }
`
