import { imageProjection } from '@/src/data/projections/imageProjection'
import { newsPagePreviewProjection } from '@/src/data/projections/newsPagePreviewProjection'
import { pagePreviewProjection } from '@/src/data/projections/pagePreviewProjection'
import { experienceObjectProjection } from '@/src/data/projections/experienceObjectProjection'
import { categoryProjection } from '@/src/data/projections/categoryProjection'

export const authorProjection = `
    _type,
    _id,
    _key,
    slug {
      current,
      _type,
    },
    firstName,
    lastName,
    seoTitle,
    seoDescription,
    canonical,
    role,
    email,
    linkedIn,
    avatar {
      ${imageProjection}
    },
    experience[] {
      ${experienceObjectProjection}
    },
    expertise[] -> {
      ${categoryProjection}
    },
    description,
    "newsPagePreviews": *[_type == "news-pages" && author._ref == ^._id] {
      ${newsPagePreviewProjection}
    },
    "pagePreviews": *[_type == "pages" && author._ref == ^._id] {
      ${pagePreviewProjection}
    },
`
