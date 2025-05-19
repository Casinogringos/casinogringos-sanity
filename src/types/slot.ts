import {
  User,
  Post,
  Blocks,
  MediaItem,
  Seo,
  AffiliateLink,
  Category,
} from "@/src/types/index";

export type Slot = {
  __typename: "Slot";
  author: User;
  modified: string;
  date: string;
  content: string;
  editorBlocks: Blocks;
  featuredImage: {
    node: MediaItem;
  };
  id: string;
  preview: Slot;
  reviewer: User;
  seo: Seo;
  slotType: {
    __typename: "SlotType";
    affiliateLink: AffiliateLink;
    bakgrundsbild: MediaItem;
    casinos: Post[];
    demoUrl: string;
    hjul: number;
    hogstaInsats: number;
    introduction: string;
    jackpot: boolean;
    lanseringsar: string;
    maxvinst: string;
    megaways: boolean;
    minstaInsats: number;
    operator: string;
    rader: number;
    rating: number;
    rtp: string;
    speltillverkare: Category;
    vinstlinjer: number;
    volatilitet: string;
  };
  slug: string;
  title: string;
  uri: string;
};
