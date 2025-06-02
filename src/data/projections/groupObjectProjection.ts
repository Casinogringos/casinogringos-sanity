export const groupObjectProjection = `
    _type
    _id
    width
    className
    content {
        ...headingObjectProjection
    }
    message
    ${headingObjectProjection}
`
