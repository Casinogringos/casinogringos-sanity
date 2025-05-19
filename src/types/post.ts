import {
  User,
  Blocks,
  MediaItem,
  AffiliateLink,
  Category,
  Seo,
  PaymentProvider,
  GameProvider,
} from "@/src/types/index";

export type Post = {
  __typename: "Post";
  id: string;
  author: {
    node: User;
  };
  content: string;
  databaseId: number;
  date: string;
  editorBlocks: Blocks;
  excerpt: string;
  featuredImage: {
    node: MediaItem;
  };
  categories: {
    edges: {
      node: Category;
    }[];
  };
  modified: string;
  postType: {
    __typename: "PostType";
    affiliateLink: {
      node: AffiliateLink;
    };
    bankId: string;
    bonus: string;
    bonusLivecasino: string;
    bonusSport: string;
    bonusprocent: string;
    brandCategories: string[];
    brandColor: string;
    brandEmail: string;
    brandSupportHours: string;
    category: Category;
    description: string;
    description2: string;
    description3: string;
    disclaimer: string;
    expertSummary: string;
    fieldGroupName: string;
    fordelar: {
      fordel: string;
    }[];
    freespins: string;
    gameprovidersNew?: {
      edges: {
        node: GameProvider;
      }[];
    };
    hemsidaUrl: string;
    introduction: string;
    kundtjanstTelefon: string;
    lanseradesDatum: string;
    liveChat: string[];
    minInsattningValue: string;
    nackdelar: {
      nackdel: string;
    }[];
    paymentprovidersNew?: {
      edges: {
        node: PaymentProvider;
      }[];
    };
    rating: string;
    ratings: {
      bonusRating: number;
      bettingRating: number;
      gameSelectionRating: number;
      liveCasinoRating: number;
      paymentProvidersRating: number;
      registrationRating: number;
      slotsRating: number;
      supportRating: number;
      usabilityRating: number;
    };
    helhetsmotivering: string;
    ribbon: string;
    ribbonText: string;
    svenskLicens: string[];
    swish: string[];
    terms: AffiliateLink;
    title: string;
    wagering: string;
    wageringFreespins: string;
    wageringLivecasino: string;
    wageringSportbonus: string;
  };
  preview: Post;
  reviewer: User;
  seo: Seo;
  slug: string;
  title: string;
  uri: string;
};
