import {
  CoreParagraphBlock,
  FlamingoHeadingBlock,
  FlamingoImageBlock,
} from "@/src/types/index";

export type FlamingoToggleBlock = {
  __typename: "FlamingoToggle";
  clientId: string;
  attributes: {
    buttonTextOpen: string;
    buttonTextClose: string;
  };
  innerBlocks: [FlamingoImageBlock, FlamingoHeadingBlock, CoreParagraphBlock];
};
