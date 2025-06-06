export const headingObjectProjection = `
  _type == 'heading-object' => {
    _type,
    _key,
    anchor,
    level,
    className,
    text,
    message
  }
`
