import { CoreParagraphBlock } from "@/src/types/index";

export type FlamingoAISummaryBlock = {
  __typename: "FlamingoAISummary";
  clientId: string;
  attributes: {
    title: string;
  };
  innerBlocks: CoreParagraphBlock[];
};
