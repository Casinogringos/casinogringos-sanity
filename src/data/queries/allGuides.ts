import { gql } from "graphql-tag";
import { guideFragment } from "@/src/data/fragments";

export const allGuidesQuery = () => gql`
  query allGuidesQuery($first: Int!) {
    guider(first: $first) {
      edges {
        node {
          ...GuideFragment
        }
      }
    }
  }
  ${guideFragment}
`;
