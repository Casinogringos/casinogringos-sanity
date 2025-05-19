import { gql } from "graphql-tag";
import { pagePreviewFragment } from "@/src/data/fragments";

export const allPagePreviewsQuery = () => gql`
  query AllPagesPreviewQuery {
    pages(first: 1000) {
      edges {
        node {
          ...PagePreviewFragment
        }
      }
    }
  }
  ${pagePreviewFragment}
`;
