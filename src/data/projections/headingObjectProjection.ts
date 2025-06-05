export const headingObjectProjection = `
  _type == 'heading-object' => {
    _type,
    _id,
    anchor,
    level,
    className,
    text,
    message
  }
`
