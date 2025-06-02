export const imageObjectProjection = `
    _type
    _id
    image
    caption
    altText
    message
    internalLink {
        ...pageProjection
    }
    externalLink
`
