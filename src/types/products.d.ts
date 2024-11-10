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
}

export interface TreeData {
  tree?: TreeCard;
  images?: { image: string; id: string }[];
  comments?: TreeComment[];
  related?: mainCarouselCardData[];
  commnet_count?: number;
  avg?: number | null;
  comment_offset?: number;
  in_cart: boolean;
}

export interface TreeComment {
  id: string;
  created: string; // Date in ISO format
  text: string;
  user_username: string;
  user_profileimage: string | null;
  child_count: number; // Recursive definition to support nested comments
  irani: string;
}
