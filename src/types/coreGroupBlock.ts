import {
  CoreParagraphBlock,
  CoreColumnsBlock,
  FlamingoHowToBlock,
  FlamingoHeadingBlock,
  FlamingoImageBlock,
  FlamingoFaqBlock,
  FlamingoCasinoBlockOld,
  FlamingoCasinoBlock,
  FlamingoBonusBlockOld,
  FlamingoBonusBlock,
  FlamingoProsAndConsBlock,
} from "@/src/types/index";

export type CoreGroupBlock = {
  __typename: "CoreGroup";
  clientId: string;
  attributes: {
    className: string;
  };
  innerBlocks: [
    CoreParagraphBlock,
    FlamingoHeadingBlock,
    FlamingoImageBlock,
    CoreColumnsBlock,
    FlamingoHowToBlock,
    FlamingoFaqBlock,
    FlamingoCasinoBlockOld,
    FlamingoCasinoBlock,
    FlamingoBonusBlockOld,
    FlamingoBonusBlock,
    FlamingoProsAndConsBlock,
  ];
};
