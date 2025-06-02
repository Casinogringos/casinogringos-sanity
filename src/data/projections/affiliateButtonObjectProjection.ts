export const affiliateButtonObjectProjection = `
    _type
    _id
    casino {
        ...casinoProjection
    }
    message
`
