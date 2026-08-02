"use client";
import { useState, useEffect } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { fetcher } from "@/lib/utils";

interface LikeDislikeButtonsProps {
  commentId: string;
  initialLikeCount: number;
  initialDislikeCount: number;
  session: Session | null | undefined;
  has_user_disliked: boolean;
  has_user_liked: boolean;
  isInTree: boolean;
}

const LikeDislikeButtons = ({
  commentId,
  initialLikeCount,
  initialDislikeCount,
  session,
  has_user_disliked,
  has_user_liked,
  isInTree,
}: LikeDislikeButtonsProps) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);
  const [isLiked, setIsLiked] = useState(has_user_liked);
  const [isDisliked, setIsDisliked] = useState(has_user_disliked);

  const handleVote = async (action: "like" | "dislike") => {
    if (!session?.access || !session?.token) {
      toast.error("لطفا ابتدا ثبت نام / ورود کنید");
      return;
    }

    try {
      const result = await fetcher(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tree/api/${
          isInTree ? "tree" : ""
        }${action}/${commentId}/`,
        "POST"
      );

      // Update state based on API response
      if (action === "like") {
        setIsLiked(result.liked);
        if (result.liked) {
          setIsDisliked(false);
          setDislikeCount((prev) => prev - (isDisliked ? 1 : 0));
        }
        setLikeCount(result.likes);
      } else {
        setIsDisliked(result.disliked);
        if (result.disliked) {
          setIsLiked(false);
          setLikeCount((prev) => prev - (isLiked ? 1 : 0));
        }
        setDislikeCount(result.dislikes);
      }
    } catch (error) {
      console.error(`${action} error:`, error);
      toast.error("خطایی رخ داده است. لطفا مجددا تلاش کنید");
    }
  };

  // Update state when props change
  useEffect(() => {
    setIsLiked(has_user_liked);
    setIsDisliked(has_user_disliked);
    setLikeCount(initialLikeCount);
    setDislikeCount(initialDislikeCount);
  }, [
    has_user_liked,
    has_user_disliked,
    initialLikeCount,
    initialDislikeCount,
  ]);

  return (
    <div className="mt-auto flex gap-4 items-center">
      <div className="flex items-center gap-1">
        <ThumbsDown
          className={`w-5 h-5 cursor-pointer ${
            isDisliked ? "text-red-500" : "text-[#909090]"
          } hover:text-red-500`}
          onClick={() => handleVote("dislike")}
        />
        <span className="text-sm">{dislikeCount}</span>
      </div>

      <div className="flex items-center gap-1">
        <ThumbsUp
          className={`w-5 h-5 cursor-pointer ${
            isLiked ? "text-green-500" : "text-[#909090]"
          } hover:text-green-500`}
          onClick={() => handleVote("like")}
        />
        <span className="text-sm">{likeCount}</span>
      </div>
    </div>
  );
};

export default LikeDislikeButtons;
