export const quoteObjectProjection = `
  _type == 'quote-object' => {
    _type,
    _id,
    content,
    message
  }
`
