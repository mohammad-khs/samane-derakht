import { TreeChildComment } from "@/types/products";

import { clsx, type ClassValue } from "clsx";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import {
  mockDatabase,
  getMockResponse,
} from "@/mocks/mockSetup";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string, method?: string): Promise<any> => {
  const mockData = getMockResponse(url, method);
  if (mockData !== null) {
    return Promise.resolve(mockData);
  }
  return Promise.reject(new Error(`No mock data found for ${url}`));
};

export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (path.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}${path}`;
  }
  return `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/${path}`;
};

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
    setProfileId(comment?.profile_id);
    setCommentToReplyUsername(comment.user_username);
    setcommentToreplyId(parentCommentId);
  }
};
