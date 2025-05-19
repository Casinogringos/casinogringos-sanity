export type PaymentProvider = {
  __typename: 'Betalningsmetod'
  id: string
  title: string
  slug: string
  paymentMethodType: {
    siteLink: {
      edges: {
        node: {
          uri: string
        }
      }[]
    }
  }
  featuredImage: {
    node: {
      altText: string
      sourceUrl: string
    }
  }
}
