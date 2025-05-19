import { gql } from 'graphql-tag'

export const redirectsQuery = () => gql`
  query redirectsQuery {
    seo {
      redirects {
        type
        target
        origin
      }
    }
  }
`
