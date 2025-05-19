import { Avatar } from "@/src/types/index";

export type UserPreview = {
  id: string;
  uri: string;
  slug: string;
  name: string;
  description: string;
  userType: {
    role: string;
    email: string;
    experience: {
      title: string;
      years: string;
    };
    expertise: {
      title: string;
    };
  };
  avatar: Avatar;
};
