import { gql } from "graphql-tag";
import { authorPreviewFragment } from "@/src/data/fragments";

export const allAuthorPreviewsQuery = () => gql`
  query AllAuthorsPreviewQuery {
    users {
      edges {
        node {
          ...AuthorPreviewFragment
        }
      }
    }
  }
  ${authorPreviewFragment}
`;
