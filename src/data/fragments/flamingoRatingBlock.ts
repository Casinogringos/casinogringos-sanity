import { gql } from 'graphql-tag'

export const flamingoRatingBlockFragment = gql`
  fragment FlamingoRatingBlockFragment on FlamingoRating {
    clientId
    __typename
    renderedHtml
  }
`
