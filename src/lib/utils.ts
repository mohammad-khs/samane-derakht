import { TreeChildComment } from "@/types/products";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// its for reply handling in comment section
export const handleReply = (
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>,
  setcommentToreplyId: Dispatch<SetStateAction<string | undefined>>,
  setCommentToReplyUsername: Dispatch<SetStateAction<string | null>>,
  comment: TreeChildComment | undefined,
  setProfileId: Dispatch<SetStateAction<string | undefined>> = () => undefined,
  parentCommentId: string | undefined = ""
) => {
  textareaRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  setTimeout(() => {
    textareaRef.current?.focus();
  }, 1000);

  if (comment) {
    //it should not be comment but user id ////////////////
    setProfileId(comment?.id);
    setCommentToReplyUsername(comment.user_username);
    setcommentToreplyId(parentCommentId);
  }
};
