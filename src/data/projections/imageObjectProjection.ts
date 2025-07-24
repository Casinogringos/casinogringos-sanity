export const imageObjectProjection = `
  _type == 'image-object' => {
    _type,
    _key,
    src,
    alt,
    caption,
    message,
    internalLink {
        slug
    },
    externalLink
  }
`
