"use client";
import CommentSection from "@/components/products/product/commentSection";
import ChatInput from "@/components/ui/chatInput";
import { TreeComment } from "@/types/products";
import { Session } from "next-auth";
import {
  createContext,
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

interface CommentAndChatSectionProps {
  productId: string;
  comments?: TreeComment[];
  session?: Session | null;
}

interface CommentAndChatSectionContext extends CommentAndChatSectionProps {
  userComment: TreeComment | undefined;
  setUserComment: Dispatch<SetStateAction<TreeComment | undefined>>;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  commentToreplyId: string | undefined;
  setcommentToreplyId: Dispatch<SetStateAction<string | undefined>>;
}
const commentAndChatSectionContext = createContext<
  CommentAndChatSectionContext | undefined
>(undefined);

const CommentAndChatSection: FC<CommentAndChatSectionProps> = ({
  productId,
  comments,
  session,
}) => {
  const [userComment, setUserComment] = useState<TreeComment | undefined>();
  const [commentToreplyId, setcommentToreplyId] = useState<string | undefined>(
    undefined
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <>
      <commentAndChatSectionContext.Provider
        value={{
          textareaRef,
          userComment,
          setUserComment,
          productId,
          comments,
          commentToreplyId,
          setcommentToreplyId,
          session,
        }}
      >
        <div className="md:w-3/4 ms-auto">
          <ChatInput />
        </div>
        <CommentSection />
      </commentAndChatSectionContext.Provider>
    </>
  );
};
export const useCommentAndChatSectionContext = () => {
  const context = useContext(commentAndChatSectionContext);
  if (context === undefined) {
    throw new Error(
      "commentAndChatSectionContext must be used within an commentAndChatSectionContext"
    );
  }
  return context;
};

export default CommentAndChatSection;
