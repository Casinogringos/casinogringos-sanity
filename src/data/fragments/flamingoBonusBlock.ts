import { gql } from 'graphql-tag'

export const flamingoBonusBlockFragment = gql`
  fragment FlamingoBonusBlockFragment on FlamingoBonus {
    __typename
    clientId
    renderedHtml
  }
`
