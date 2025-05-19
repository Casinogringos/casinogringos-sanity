import { gql } from "graphql-tag";
import { newsPreviewFragment } from "@/src/data/fragments";

export const newsPreviewBySlugQuery = () => gql`
  query NewsBySlugQuery($slug: ID!) {
    nyheter(first: 1000) {
      edges {
        node {
          ...NewsPreviewFragment
        }
      }
    }
  }
  ${newsPreviewFragment}
`;
