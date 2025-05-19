import { gql } from "graphql-tag";
import { postListItemFragment } from "@/src/data/fragments";

export const allCasinoCardsQuery = () => gql`
  query CasinoHelperQuery {
    posts(first: 1000, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      edges {
        node {
          ...PostListItemFragment
        }
      }
    }
  }
  ${postListItemFragment}
`;
