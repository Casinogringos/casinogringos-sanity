import { gql } from "graphql-tag";
import { newsPreviewFragment } from "@/src/data/fragments";

export const allNewsPreviewsQuery = () => gql`
  query AllNewsPreviewQuery($first: Int!) {
    nyheter(first: $first) {
      edges {
        node {
          ...NewsPreviewFragment
        }
      }
    }
  }
  ${newsPreviewFragment}
`;
