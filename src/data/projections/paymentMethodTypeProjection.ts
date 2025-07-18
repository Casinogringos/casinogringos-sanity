export const paymentMethodTypeProjection = `
  _type == 'payment-methods' => {
    name,
    slug
  }
`
