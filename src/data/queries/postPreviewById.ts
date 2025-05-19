import { gql } from 'graphql-tag'

export const postPreviewByIdQuery = () => gql`
  query PostPreviewQuery($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      databaseId
      uri
      status
    }
  }
`
