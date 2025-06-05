export const embedObjectProjection = `
  _type == 'embed-object' => {
    _type,
    _id,
    url,
    provider,
    message
  }
`
