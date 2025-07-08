import {
  objectProjections,
  faqItemObjectProjection,
  toplistProjection, imageObjectProjection,
  authorProjection,
  imageProjection
} from '@/src/data/projections'

export const pageProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  _createdAt,
  _updatedAt,
  seoTitle,
  seoDescription,
  seoImage {
    ${imageProjection}
  },
  intro,
  author {
    ${authorProjection}
  },
  featuredImage {
    ${imageObjectProjection}
  },
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
