import { FC } from "react";
import CustomerReviewsCarousel from "./ui/main/customerReviewsCarousel";
import { CommentCarouselCardData } from "@/types/mainCarousels";

interface CustomerReviewsProps {}

const CustomerReviews: FC<CustomerReviewsProps> = async () => {
  const res = await fetch("https://treeone.liara.run/api/comments");
  const data: CommentCarouselCardData[] = await res.json();
  return (
    <>
      <CustomerReviewsCarousel customerReviewsData={data} />
    </>
  );
};

export default CustomerReviews;
