export const embedObjectProjection = `
  _type == 'embed-object' => {
    _type,
    _id,
    _key,
    url,
    provider,
    message
  }
`
