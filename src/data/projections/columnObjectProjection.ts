export const columnObjectProjection = `
    _type
    _id
    width
    className
    column {
        ...headingObjectProjection
    }
    message
    ${headingObjectProjection}
`
