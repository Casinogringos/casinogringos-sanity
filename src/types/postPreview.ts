import { User, MediaItem, AffiliateLink } from "@/src/types/index";

export type PostPreview = {
  __typename: "Post";
  id: string;
  uri: string;
  title: string;
  author: User;
  databaseId: number;
  date: string;
  excerpt: string;
  featuredImage: {
    node: MediaItem;
  };
  modified: string;
  postType: {
    __typename: "PostType";
    affiliateLink: {
      node: AffiliateLink;
    };
    title: string;
  };
};
