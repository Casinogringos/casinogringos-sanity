export const buttonObjectProjection = `
  _type == 'button-object' => {
    _type,
    _id,
    title,
    uri,
    page {
        current {
            slug
        }
    },
    message
  }
`
