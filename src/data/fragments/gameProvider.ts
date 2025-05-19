import { gql } from 'graphql-tag'

export const gameProviderFragment = gql`
  fragment GameProviderFragment on GameproviderNew {
    __typename
    id
    title
    slug
    gameProviderType {
      siteLink {
        nodes {
          uri
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
