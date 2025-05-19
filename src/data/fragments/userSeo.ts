import { gql } from 'graphql-tag'

export const userSeoFragment = gql`
  fragment UserSeoFragment on SEOUser {
    __typename
    title
    metaDesc
    canonical
    social {
      linkedIn
    }
    schema {
      raw
    }
    metaRobotsNoindex
  }
`
