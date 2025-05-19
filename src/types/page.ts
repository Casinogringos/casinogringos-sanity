import {
  Blocks,
  Category,
  Faq,
  MediaItem,
  Post,
  Seo,
  User,
} from "@/src/types/index";

export type Page = {
  __typename: "Page";
  id: string;
  modified: string;
  author: User;
  content: string;
  databaseId: number;
  date: string;
  editorBlocks: Blocks;
  featuredImage: {
    node: MediaItem;
  };
  pageType: {
    __typename: "PageType";
    bannerText: string;
    category: {
      edges: {
        node: Category;
      }[];
    };
    faq: Faq;
    faqHeading: string;
    faqSubtitle: string;
    fieldGroupName: string;
    showWidget: boolean;
    subtitle: string;
    topCasinoSubtitle: string;
    topPosts: {
      edges: {
        node: Post;
      }[];
    };
  };
  isPreview: boolean;
  preview: Page;
  reviewer: User;
  seo: Seo;
  slug: string;
  title: string;
  uri: string;
};
