import { imageProjection } from '@/src/data/projections'

export const imageObjectProjection = `
  _type == 'image-object' => {
    _type,
    image {
        ${imageProjection}
    },
    caption,
    altText,
    message,
    internalLink {
        slug
    },
    externalLink
  }
`
