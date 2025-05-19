import { MediaItem } from "@/src/types/index";

export type AffiliateLink = {
  __typename: "AffiliateLink";
  affiliateLinkId: number;
  affiliateLinkType: {
    __typename: "AffiliateLinkType";
    affiliateUrl: string;
    fieldGroupName: string;
    logoForOperator: MediaItem;
  };
  databaseId: number;
  date: string;
  dateGmt?: string;
  id: number;
  link?: string;
  modified?: string;
  modifiedGmt?: string;
  slug: string;
  title: string;
  uri: string;
};
