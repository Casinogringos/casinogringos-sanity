import { gql } from "graphql-tag";
import { postFragment } from "@/src/data/fragments";

export const menuByIdQuery = () => gql`
  query MenuQuery($id: ID!) {
    menu(id: $id, idType: ID) {
      slug
      menuItems(first: 100) {
        edges {
          node {
            uri
            id
            label
            parentId
            cssClasses
            connectedNode {
              node {
                ...PostFragment
              }
            }
            childItems(first: 100) {
              edges {
                node {
                  id
                  uri
                  label
                  parentId
                  cssClasses
                  connectedNode {
                    node {
                      ...PostFragment
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${postFragment}
`;
