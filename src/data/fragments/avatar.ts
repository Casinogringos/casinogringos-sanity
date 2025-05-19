import gql from 'graphql-tag'

export const avatarFragment = gql`
  fragment AvatarFragment on Avatar {
    __typename
    url
    width
    height
  }
`
