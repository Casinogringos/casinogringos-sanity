import { MediaItem, Blocks, Seo } from "@/src/types/index";

export type Guide = {
  __typename: "Guide";
  content: string;
  modified: string;
  databaseId: number;
  date?: string;
  dateGmt?: string;
  editorBlocks: Blocks;
  excerpt: string;
  featuredImage: {
    node: MediaItem;
  };
  id: number;
  isPreview?: boolean;
  seo: Seo;
  slug: string;
  title: string;
  uri: string;
};
