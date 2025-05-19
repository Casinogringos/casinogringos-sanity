import { gql } from 'graphql-tag'

export const guidePreviewByIdQuery = () => gql`
  query GuidePreviewQuery($id: ID!) {
    guide(id: $id, idType: DATABASE_ID) {
      databaseId
      uri
      status
    }
  }
`
