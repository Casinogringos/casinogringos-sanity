import { gql } from "graphql-tag";
import { postPreviewFragment } from "@/src/data/fragments";

export const allPostPreviewsQuery = () => gql`
  query AllPostPreviewsQuery {
    posts(first: 1000) {
      edges {
        node {
          ...PostPreviewFragment
        }
      }
    }
  }
  ${postPreviewFragment}
`;
