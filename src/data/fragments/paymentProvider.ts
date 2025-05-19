import { gql } from 'graphql-tag'

export const paymentProviderFragment = gql`
  fragment PaymentProviderFragment on Betalningsmetod {
    __typename
    id
    title
    slug
    paymentMethodType {
      siteLink {
        edges {
          node {
            uri
          }
        }
      }
    }
    featuredImage {
      node {
        altText
        sourceUrl
      }
    }
  }
`
