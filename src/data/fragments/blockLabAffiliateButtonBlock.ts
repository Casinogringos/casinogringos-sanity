import { gql } from 'graphql-tag'

export const blockLabAffiliateButtonBlockFragment = gql`
  fragment BlockLabAffiliateButtonBlockFragment on BlockLabAffiliateButton {
    __typename
    clientId
    attributes {
      bonusTitle
      buttonText
      trackerUrl
    }
    renderedHtml
  }
`
