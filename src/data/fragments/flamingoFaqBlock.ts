import { gql } from 'graphql-tag'

export const flamingoFaqBlockFragment = gql`
  fragment FlamingoFaqBlockFragment on FlamingoFaq {
    __typename
    clientId
    attributes {
      items
      description
    }
  }
`
