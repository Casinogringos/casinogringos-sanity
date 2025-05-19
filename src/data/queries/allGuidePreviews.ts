import { gql } from "graphql-tag";
import { guidePreviewFragment } from "@/src/data/fragments";

export const allGuidePreviewsQuery = () => gql`
  query AllGuidesPreviewQuery {
    guider(first: 1000) {
      edges {
        node {
          ...GuidePreviewFragment
        }
      }
    }
  }
  ${guidePreviewFragment}
`;
