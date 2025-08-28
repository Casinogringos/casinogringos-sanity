export const categoryProjection = `
    _type,
    _id,
    _key,
    title,
    slug {
      current,
      _type,
    },
`