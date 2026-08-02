import { Authority } from "@/types/complete-info";

export const mockAuthority: Authority = {
  status: true,
  url: "https://payment.example.com/verify/12345",
  authority: "AUTH-12345-XYZ",
  order_id: "ORD-006",
  has_video: false,
  has_voice: false,
  images: true,
  video_price: 0,
  voice_price: 0,
  image_price: 50000,
  products_count: 2,
  all_price: 2700000,
  all_price_with_off: 2430000,
  wallet_balance: 5000000,
};