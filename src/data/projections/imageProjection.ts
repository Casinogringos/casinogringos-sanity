export const imageProjection = `
    _key,
    asset {
      _type,
      _ref,
      metadata {
        dimensions {
          aspectRatio,
          height,
          width
        },
      }
    },
    alt
`
