export const paragraphObjectProjection = `
  _type == 'paragraph-object' => {
    _type,
    _key,
    className,
    content,
    message
  }
`
