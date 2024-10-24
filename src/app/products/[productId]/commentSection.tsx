import { Comment } from "@/types/products";
import { FC } from "react";
import CommentLayout from "./commentLayout";

interface CommentSectionProps {
  comments?: Comment[];
}

const CommentSection: FC<CommentSectionProps> = ({ comments }) => {
  return (
    <>
      {comments?.map((comment: Comment) => (
        <div key={comment.id}>
          <CommentLayout comment={comment} />
          {comment.children && comment.children.length > 0 && (
            <div className=" border-2 mr-11 sm:mx-20 rounded-xl pe-3 border-[#EAEAEA]">
              {comment.children.map((childComment: Comment) => (
                <div className="" key={childComment.id}>
                  <CommentLayout
                    replyedTo={comment.user_username}
                    key={childComment.id}
                    childComment={childComment}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default CommentSection;
