import {
  objectProjections,
  faqItemObjectProjection,
  toplistProjection, imageObjectProjection,
  authorProjection
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
  author {
    ${authorProjection}
  },
  featuredImage {
    ${imageObjectProjection}
  },
  seoDescription,
  faqs[] {
    ${faqItemObjectProjection}
  },
  toplist-> {
    ${toplistProjection}
  },
  content[] {
    ${objectProjections}
  }
`
