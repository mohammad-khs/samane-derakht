import { FC } from "react";
import CustomerReviewsCarousel from "./customerReviewsCarousel";
import { CommentCarouselCardData } from "@/types/mainCarousels";

const fetchCustomerReviewsData = async (): Promise<CommentCarouselCardData[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/comments`);

    if (!res.ok) {
      throw new Error("Failed to fetch customer reviews");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching customer reviews:", error);
    return [];
  }
};

const CustomerReviews: FC = async () => {
  const data = await fetchCustomerReviewsData();

  return (
    <>
      <CustomerReviewsCarousel customerReviewsData={data} />
    </>
  );
};

export default CustomerReviews;
