export const ratingObjectProjection = `
  _type == 'rating-object' => {
    _type,
    _id,
    _key,
    rating,
    motivation,
    title
  }
`
