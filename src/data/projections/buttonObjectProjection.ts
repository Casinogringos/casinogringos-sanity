export const buttonObjectProjection = `
  _type == 'button-object' => {
    _type,
    _id,
    _key,
    title,
    uri,
    page-> {
        _type,
        _id,
        _key,
        slug {
            _type,
            current
        }
    },
    affLink-> {
      _type,
      slug {
        current
      }
    }
  }
`
