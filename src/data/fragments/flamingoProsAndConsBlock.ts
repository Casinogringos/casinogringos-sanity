import { gql } from 'graphql-tag'

export const flamingoProsAndConsBlockFragment = gql`
  fragment FlamingoProsAndConsBlockFragment on FlamingoProsAndCons {
    __typename
    clientId
    attributes {
      author
      product
      pros
      prosTitle
      cons
      consTitle
    }
  }
`
