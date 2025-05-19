import { gql } from "graphql-tag";
import { postPreviewFragment } from "@/src/data/fragments";

export const postPreviewsSidebarQuery = () => gql`
  query postPreviewsSidebarQuery($first: Int!) {
    posts(
      first: $first
      where: { categoryIn: 10223, orderby: { field: MENU_ORDER, order: ASC } }
    ) {
      edges {
        node {
          ...PostPreviewFragment
        }
      }
    }
  }
  ${postPreviewFragment}
`;
