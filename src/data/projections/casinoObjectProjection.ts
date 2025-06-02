export const casinoObjectProjection = `
    _type
    _id
    casino {
        ...casinoProjection
    }
    message
    offer
    description
    buttonText
`
