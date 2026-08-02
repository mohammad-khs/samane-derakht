"use client";

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { FC, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { MyMainTreeData } from "./page";
import { fetcher } from "@/lib/utils";

interface SaveAndDeleteProps {
  data: MyMainTreeData;
  session: Session | null;
}

const SaveAndDelete: FC<SaveAndDeleteProps> = ({ data, session }) => {
  const [isSaved, setIsSaved] = useState(data.saved);
  const [loading, setLoading] = useState(false);
  const handleDeleteFavorite = async (id: string) => {
    setLoading(true);
    try {
const response = await fetcher(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/remove-fav/${id}/`,
        "POST"
      );

      if (response?.removed === true && response.added === false) {
        setIsSaved(false);
      } else {
        setIsSaved(true);
      }
      console.log(response);
    } catch (error) {
      console.error("Error fetching favorite:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        size={"resizble"}
        className="mx-2"
        disabled={loading}
        onClick={() => handleDeleteFavorite(data.data.id)}
        variant={"lightGray"}
      >
        <FaHeart className={`h-4 w-4 ${isSaved ? "text-red-600" : ""}`} />
      </Button>
    </>
  );
};

export default SaveAndDelete;
