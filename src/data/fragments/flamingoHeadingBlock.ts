import { gql } from 'graphql-tag'

export const flamingoHeadingBlockFragment = gql`
  fragment FlamingoHeadingBlockFragment on FlamingoHeading {
    clientId
    __typename
    attributes {
      text
      level
    }
  }
`
