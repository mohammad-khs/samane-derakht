import { mainCarouselCardData } from "./mainCarousels";

export interface TreeCard {
  id: string;
  in_stock: boolean;
  stock_number: number;
  name: string;
  price: number;
  price_off: number;
  image: string | null;
  avg: number | null;
  count: number | null;
  slug: string | null;
  description: string | null
}

export interface TreeData {
  tree?: TreeCard;
  images?: { image: string; id: string }[];
  related?: mainCarouselCardData[];
  comment_count?: number;
  avg?: number | null;
}

export interface TreeChildComment {
  id: string;
  created: string;
  text: string;
  user_username: string;
  user_profileimage: string | null;
  profile_id: string;
  irani: string;
  likes_count: number;
  dislikes_count: number;
  has_user_liked: boolean;
  has_user_disliked: boolean;
}

export interface TreeComment {
  child_of_all: TreeChildComment[];
  id: string;
  created: string;
  text: string;
  user_username: string;
  user_profileimage: string | null;
  count_of_child: number;
  profile_id: string;
  irani: string;
  likes_count: number;
  dislikes_count: number;
  has_user_liked: boolean;
  has_user_disliked: boolean;
}
