"use client";
import CommentSection from "@/components/products/product/commentSection";
import ChatInput from "@/components/ui/chatInput";
import { Comment } from "@/types/products";
import { FC, useState } from "react";

interface CommentAndChatSectionProps {
  productId: string;
  comments?: Comment[];
}

const CommentAndChatSection: FC<CommentAndChatSectionProps> = ({
  productId,
  comments,
}) => {
  const [userComment, setUserComment] = useState<Comment | undefined>();

  return (
    <>
      <div className="md:w-3/4 ms-auto">
        <ChatInput setUserComment={setUserComment} productId={productId} />
      </div>
      <CommentSection
        userComment={userComment}
        productId={productId}
        comments={comments}
      />
    </>
  );
};

export default CommentAndChatSection;
