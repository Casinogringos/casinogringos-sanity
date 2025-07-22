import { imageProjection, newsPagePreviewProjection, pagePreviewByAuthorProjection, pagePreviewProjection } from '@/src/data/projections'

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
    "newsPagePreviews": *[_type == "news-pages" && author._ref == ^._id] {
      ${newsPagePreviewProjection}
    },
    "subPagePreviews": *[_type == "pages" && author._ref == ^._id] {
      ${pagePreviewByAuthorProjection}
    },
`
