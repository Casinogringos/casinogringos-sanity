export const imageObjectProjection = `
  _type == 'image-object' => {
    _type,
    _key,
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
