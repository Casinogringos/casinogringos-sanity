import { MediaItem, UserPreview } from "@/src/types/index";

export type PagePreview = {
  id: string;
  slug: string;
  uri: string;
  title: string;
  date: string;
  modified: string;
  author: {
    node: UserPreview;
  };
  featuredImage: {
    node: MediaItem;
  };
};
