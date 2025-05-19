import { gql } from 'graphql-tag'

export const blockLabCasinoBlockFragment = gql`
  fragment BlockLabCasinoBlockFragment on BlockLabCasinoBlock {
    clientId
    attributes {
      brandName
      brandOffer
      buttonText
      trackerUrl
    }
    brandDescription
    logoUrl
    __typename
    renderedHtml
  }
`
