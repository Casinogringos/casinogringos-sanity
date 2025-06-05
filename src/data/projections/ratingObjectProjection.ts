export const ratingObjectProjection = `
  _type == 'rating-object' => {
    _type,
    _id,
    rating,
    motivation,
    title
  }
`
