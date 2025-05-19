import { gql } from "graphql-tag";
import { newsFragment } from "@/src/data/fragments";

export const allNewsQuery = () => gql`
  query AllNewsQuery($first: Int!) {
    nyheter(first: $first) {
      edges {
        node {
          ...NewsFragment
        }
      }
    }
  }
  ${newsFragment}
`;
