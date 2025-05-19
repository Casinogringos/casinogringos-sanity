import { gql } from "graphql-tag";
import { coreParagraphBlockFragment } from "@/src/data/fragments/index";

export const flamingoAISummaryBlockFragment = gql`
  fragment FlamingoAISummaryBlockFragment on FlamingoAiSummary {
    __typename
    clientId
    attributes {
      title
    }
    innerBlocks {
      ...CoreParagraphBlockFragment
    }
  }
  ${coreParagraphBlockFragment}
`;
