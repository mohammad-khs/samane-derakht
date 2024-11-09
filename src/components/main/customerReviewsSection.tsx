import { FC } from "react";
import CustomerReviewsCarousel from "./customerReviewsCarousel";
import { CommentCarouselCardData } from "@/types/mainCarousels";

interface CustomerReviewsProps {}

const CustomerReviews: FC<CustomerReviewsProps> = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/comments`
  );
  const data: CommentCarouselCardData[] = await res.json();
  return (
    <>
      <CustomerReviewsCarousel customerReviewsData={data} />
    </>
  );
};

export default CustomerReviews;
