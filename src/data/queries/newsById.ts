import { gql } from 'graphql-tag'

export const newsByIdQuery = () => gql`
  query NewsByIdQuery($id: ID!) {
    nyhet(id: $id, idType: DATABASE_ID) {
      databaseId
      uri
      status
    }
  }
`
