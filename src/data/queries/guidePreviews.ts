import { gql } from "graphql-tag";
import { guidePreviewFragment } from "@/src/data/fragments";

export const guidePreviewsQuery = () => gql`
  query GuidePreviewsQuery($count: Int!) {
    guider(first: $count, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          ...GuidePreviewFragment
        }
      }
    }
  }
  ${guidePreviewFragment}
`;
