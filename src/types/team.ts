import { MediaItem } from "@/src/types/index";

export type Team = {
  __typename: string;
  id: string;
  title: string;
  slug: string;
  featuredImage: MediaItem;
};
