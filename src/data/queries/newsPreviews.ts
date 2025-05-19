import { gql } from "graphql-tag";
import { newsPreviewFragment } from "@/src/data/fragments";

export const newsPreviewsQuery = () => gql`
  query NewsPreviewsQuery($count: Int!) {
    nyheter(first: $count, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          ...NewsPreviewFragment
        }
      }
    }
  }
  ${newsPreviewFragment}
`;
