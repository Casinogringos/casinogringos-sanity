export const imageObjectProjection = `
  _type == 'image-object' => {
    _type,
    _id,
    image,
    caption,
    altText,
    message,
    internalLink {
        slug
    },
    externalLink
  }
`
