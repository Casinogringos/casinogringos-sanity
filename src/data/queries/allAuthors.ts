import { gql } from "graphql-tag";
import { authorFragment } from "@/src/data/fragments";

export const allAuthorsQuery = () => gql`
  query AllAuthorsQuery {
    users {
      edges {
        node {
          ...AuthorFragment
        }
      }
    }
  }
  ${authorFragment}
`;
