import { MediaItem, User, Seo, Post } from "@/src/types/index";

export type News = {
  __typename: "Nyhet";
  content: string;
  modified: string;
  databaseId: number;
  date: string;
  excerpt: string;
  featuredImage: {
    node: MediaItem;
  };
  id: string;
  isPreview: boolean;
  reviewer: User;
  seo: Seo;
  slug: string;
  title: string;
  uri: string;
  newsType: {
    casinoCta: Post;
  };
};
