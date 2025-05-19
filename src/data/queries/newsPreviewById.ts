import { gql } from 'graphql-tag'

export const newsPreviewByIdQuery = () => gql`
  query NewsPreviewQuery($id: ID!) {
    nyhet(id: $id, idType: DATABASE_ID) {
      databaseId
      uri
      status
    }
  }
`
