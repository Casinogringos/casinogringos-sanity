import { gql } from 'graphql-tag'

export const flamingoCasinoBlockOldFragment = gql`
  fragment FlamingoCasinoBlockOldFragment on FlamingoCasinoOld {
    clientId
    __typename
    attributes {
      logoUrl
      buttonText
      brandName
      offer
      description
      trackerUrl
    }
  }
`
