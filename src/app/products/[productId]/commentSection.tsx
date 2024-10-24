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
            <div className="relative border-2 z-10 mr-11 sm:mx-20 rounded-xl pe-3 bg-white border-[#EAEAEA]">
              <div className="border-r-2 -top-12 w-[40px] -right-10 sm:-right-14 border-dashed border-b-2 absolute border-[#EAEAEA] h-1/3"></div>
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
