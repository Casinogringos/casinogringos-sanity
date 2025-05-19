import { gql } from 'graphql-tag'

export const flamingoBonusBlockOldFragment = gql`
  fragment FlamingoBonusBlockOldFragment on FlamingoBonusOld {
    clientId
    __typename
    attributes {
      featuredImage
      trackerUrl
      title
      information
      terms
      buttonText
    }
  }
`
