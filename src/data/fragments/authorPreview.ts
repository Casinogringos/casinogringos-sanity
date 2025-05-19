import { gql } from "graphql-tag";
import { avatarFragment, userSeoFragment } from "@/src/data/fragments/index";

export const authorPreviewFragment = gql`
  fragment AuthorPreviewFragment on User {
    __typename
    id
    uri
    slug
    name
    seo {
      ...UserSeoFragment
    }
    description
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
    avatar {
      ...AvatarFragment
    }
  }
  ${avatarFragment}
  ${userSeoFragment}
`;
