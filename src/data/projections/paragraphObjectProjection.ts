export const paragraphObjectProjection = `
  _type == 'paragraph-object' => {
    _type,
    _id,
    className,
    content,
    message
  }
`
