import { imageProjection } from '@/src/data/projections/imageProjection'
import { newsPagePreviewProjection } from '@/src/data/projections/newsPagePreviewProjection'
import { pagePreviewProjection } from '@/src/data/projections/pagePreviewProjection'

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
    role,
    email,
    linkedIn,
    avatar {
      ${imageProjection}
    },
    description,
    "newsPagePreviews": *[_type == "news-pages" && author._ref == ^._id] {
      ${newsPagePreviewProjection}
    },
    "subPagePreviews": *[_type == "pages" && author._ref == ^._id] {
      ${pagePreviewProjection}
    },
`
