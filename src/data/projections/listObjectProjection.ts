export const listObjectProjection = `
  _type == 'list-object' => {
    _type,
    _id,
    message,
    items {
        _type,
        _id,
        message,
        content {
            _type == 'heading-object' => {
                _type,
                _id,
                anchor,
                level,
                className,
                text,
                message
            }
        }
    }   
  }
`
