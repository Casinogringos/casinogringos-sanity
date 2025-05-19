import { postListItemFragment } from "@/src/data/fragments/index";
import { gql } from "graphql-tag";

export const pageInfoFragment = gql`
  fragment PageInfoFragment on PageType {
    __typename
    bannerText
    subtitle
    showWidget
    category {
      edges {
        node {
          ... on Category {
            databaseId
            posts(
              first: 100
              where: { orderby: { field: MENU_ORDER, order: ASC } }
            ) {
              edges {
                node {
                  ...PostListItemFragment
                }
              }
            }
          }
        }
      }
    }
  }
  ${postListItemFragment}
`;
