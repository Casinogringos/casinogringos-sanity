import { gql } from "graphql-tag";
import { categoryFragment } from "@/src/data/fragments";

export const allCategoriesQuery = () => gql`
  query AllCategoriesQuery {
    categories {
      edges {
        node {
          ...CategoryFragment
        }
      }
    }
  }
  ${categoryFragment}
`;
