import { gql } from "graphql-tag";
import {
  flamingoHeadingBlockFragment,
  coreParagraphBlockFragment,
} from "@/src/data/fragments/index";

export const flamingoHowToBlockFragment = gql`
  fragment FlamingoHowToBlockFragment on FlamingoHowTo {
    __typename
    clientId
    attributes {
      hasDuration
      unorderedList
      days
      hours
      minutes
      seconds
      description
      steps
    }
  }
  ${flamingoHeadingBlockFragment}
  ${coreParagraphBlockFragment}
`;
