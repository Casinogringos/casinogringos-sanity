export const buttonsObjectProjection = `
  _type == 'buttons-object' => {
    _type,
    _id,
    buttons[] {
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
    },
    message
  }
`
