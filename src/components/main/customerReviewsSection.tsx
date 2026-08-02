import { FC } from "react";
import CustomerReviewsCarousel from "./customerReviewsCarousel";
import { CommentCarouselCardData } from "@/types/mainCarousels";
import { fetcher } from "@/lib/utils";

const fetchCustomerReviewsData = async (): Promise<
  CommentCarouselCardData[]
> => {
  try {
    const data = await fetcher(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/comments`
    );
    return data;
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
