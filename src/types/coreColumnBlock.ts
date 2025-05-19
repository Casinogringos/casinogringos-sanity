import {
  RenderedHtmlBlock,
  CoreImageBlock,
  CoreHeadingBlock,
  YoastHowToBlock,
  CoreParagraphBlock,
} from "@/src/types/index";

export type CoreColumnBlock = {
  __typename: "CoreColumn";
  attributes: {
    columnWidth: number;
    className: string;
  };
  innerBlocks: [
    CoreParagraphBlock,
    CoreHeadingBlock,
    RenderedHtmlBlock,
    CoreImageBlock,
    YoastHowToBlock,
  ];
};
