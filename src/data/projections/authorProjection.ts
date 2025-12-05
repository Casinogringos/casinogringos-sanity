import { imageProjection } from '@/src/data/projections/imageProjection'
import { getNewsPagePreviewProjection } from '@/src/data/projections/newsPagePreviewProjection'
import { getPagePreviewProjection } from '@/src/data/projections/pagePreviewProjection'
import { experienceObjectProjection } from '@/src/data/projections/experienceObjectProjection'
import { getCategoryProjection } from '@/src/data/projections/categoryProjection'

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
      ${getCategoryProjection({ items: false, author: false })}
    },
    description,
    "newsPagePreviews": *[_type == "news-pages" && (!defined(publishedAt) || publishedAt <= now()) && author._ref == ^._id && !(_id match "drafts.*")] | order(coalesce(publishedAt, originalPublishedAt, _createdAt) desc) {
      ${getNewsPagePreviewProjection({ author: false })}
    },
    "pagePreviews": *[_type == "pages" && (!defined(publishedAt) || publishedAt <= now()) && author._ref == ^._id && !(_id match "drafts.*")] | order(coalesce(publishedAt, originalPublishedAt, _createdAt) desc) {
      ${getPagePreviewProjection({ author: false })}
    },
`
