import { gql } from "graphql-tag";
import {
  coreParagraphBlockFragment,
  flamingoImageBlockFragment,
  flamingoHeadingBlockFragment,
  coreListBlockFragment,
  coreButtonsBlockFragment,
} from "@/src/data/fragments/index";

export const coreColumnsBlockFragment = gql`
  fragment CoreColumnsBlockFragment on CoreColumns {
    __typename
    clientId
    attributes {
      className
    }
    innerBlocks {
      ... on CoreColumn {
        clientId
        attributes {
          columnWidth: width
          className
        }
        innerBlocks {
          ...CoreParagraphBlockFragment
          ...FlamingoHeadingBlockFragment
          ...FlamingoImageBlockFragment
          ...CoreListBlockFragment
          ...CoreButtonsBlockFragment
        }
      }
    }
  }
  ${coreParagraphBlockFragment}
  ${coreButtonsBlockFragment}
  ${flamingoHeadingBlockFragment}
  ${flamingoImageBlockFragment}
  ${coreListBlockFragment}
`;
