import { CoreColumnBlock } from "@/src/types/index";

export type CoreColumnsBlock = {
  __typename: "CoreColumns";
  clientId: string;
  innerBlocks: CoreColumnBlock[];
};
