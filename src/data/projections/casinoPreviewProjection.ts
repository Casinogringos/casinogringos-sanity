export const casinoPreviewProjection = `
    _type,
    _id,
    _key,
    slug {
        _type,
        current
    },
    name,
    logo {
        _type,
        src,
        altText
    },
`
