import { Guide, News, Post, Seo } from "@/src/types/index";

export type Category = {
  __typename: "Category";
  categoryType: {
    categoryName: string;
    icon: {
      node: {
        altText: string;
        sourceUrl: string;
      };
    };
  };
  id: string;
  count: number;
  description: string;
  guider: Guide[];
  name: string;
  nyheter: News[];
  posts: {
    edges: {
      node: Post;
    }[];
  };
  seo: Seo;
  slug: string;
  uri: string;
};
