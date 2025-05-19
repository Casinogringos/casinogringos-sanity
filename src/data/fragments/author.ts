import { gql } from "graphql-tag";
import { avatarFragment, userSeoFragment } from "@/src/data/fragments/index";

export const authorFragment = gql`
  fragment AuthorFragment on User {
    __typename
    id
    name
    slug
    description
    uri
    userType {
      role
      email
      experience {
        title
        years
      }
      expertise {
        title
      }
    }
    avatar(size: 400) {
      ...AvatarFragment
    }
    seo {
      ...UserSeoFragment
    }
    posts(first: 300, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        uri
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
    # pages(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
    #   nodes {
    #     title
    #     uri
    #   }
    # }
  }
  ${avatarFragment}
  ${userSeoFragment}
`;
