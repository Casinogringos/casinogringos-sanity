import { CoreColumnBlock } from "@/types/index";

export type CoreColumnsBlock = {
  __typename: "CoreColumns";
  clientId: string;
  attributes: {
    className?: string;
  };
  innerBlocks: CoreColumnBlock[];
};
