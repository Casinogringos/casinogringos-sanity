import {
  RenderedHtmlBlock,
  BlockLabCasinoBlock,
  BlockLabAffiliateButtonBlock,
  CoreParagraphBlock,
  CoreHeadingBlock,
  CoreImageBlock,
  CoreEmbedBlock,
  CoreColumnsBlock,
  CoreGroupBlock,
  YoastHowToBlock,
  YoastFaqBlock,
  FlamingoFaqBlock,
  FlamingoHeadingBlock,
  FlamingoImageBlock,
  FlamingoAISummaryBlock,
  FlamingoToggleBlock,
  FlamingoHowToBlock,
  FlamingoCasinoBlock,
  FlamingoBonusBlock,
} from "@/src/types/index";

export type Blocks = Array<
  | RenderedHtmlBlock
  | BlockLabCasinoBlock
  | BlockLabAffiliateButtonBlock
  | CoreParagraphBlock
  | CoreHeadingBlock
  | CoreImageBlock
  | CoreEmbedBlock
  | CoreColumnsBlock
  | CoreGroupBlock
  | YoastHowToBlock
  | YoastFaqBlock
  | FlamingoFaqBlock
  | FlamingoHeadingBlock
  | FlamingoImageBlock
  | FlamingoAISummaryBlock
  | FlamingoToggleBlock
  | FlamingoHowToBlock
  | FlamingoCasinoBlock
  | BlockLabAffiliateButtonBlock
  | FlamingoBonusBlock
>;
