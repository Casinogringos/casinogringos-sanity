import {
  Avatar,
  Guide,
  MediaItem,
  News,
  Page,
  Post,
  UserSeo,
  Slot,
} from "@/src/types/index";

export type User = {
  __typename: "User";
  avatar: Avatar;
  description: string;
  email: string;
  firstName: string;
  guider: Guide[];
  lastName: string;
  mediaItems: MediaItem[];
  name: string;
  nicename: string;
  nickname: string;
  nyheter: News[];
  pages: Page[];
  posts: Post[];
  seo: UserSeo;
  slots: Slot[];
  slug: string;
  uri: string;
  url: string;
  username: string;
  userType: {
    __typename: "UserType";
    email: string;
    experience: {
      title: string;
      years: number;
    }[];
    expertise: {
      title: string;
    }[];
    role: string;
  };
};
