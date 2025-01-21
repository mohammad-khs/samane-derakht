"use client";

import { Button } from "@/components/ui/button";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import SignInModal from "../authentication/signInModal";
import { useCommentAndChatSectionContext } from "@/app/products/[productName]/commentAndChatSection";
import { useSession } from "next-auth/react";
import { X } from "lucide-react";

interface ChatInputProps {}

const ChatInput: FC<ChatInputProps> = () => {
  const {
    productId,
    setUserComment,
    textareaRef,
    commentToreplyId,
    commentToReplyUsername,
    setCommentToReplyUsername,
    setcommentToreplyId,
    profileId
  } = useCommentAndChatSectionContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const randomUUID = () => Math.random().toString(36).substring(2, 15);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();

  const deleteReplyTo = () => {
    setcommentToreplyId(undefined);
    setCommentToReplyUsername(null);
  };

  const sendMessage = async () => {
    if (session.status === "unauthenticated") {
      toast.error("لطفا احراز هویت فرمایید");
      return setIsModalOpen(true);
    }
    if (!input) return;
    setIsLoading(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/api/${
          commentToreplyId ? `replyComment` : `addComment`
        }/${productId}/${commentToreplyId ? `${commentToreplyId}/` : ""}`,
        { text: input , profile_id : profileId },
        {
          headers: {
            Authorization: `Bearer ${session?.data?.access}`,
            TOKEN: session?.data?.token,
          },
        }
      );

      setUserComment({
        count_of_child: 0,
        created: new Date().toISOString(),
        id: randomUUID(),
        irani: "",
        text: input,
        user_profileimage: "",
        user_username: "شما",
        child_of_all: [],
      });
      setInput("");
      setCommentToReplyUsername(null);
      setcommentToreplyId(undefined);
      toast.success("پیام شما با موفقیت ثبت شد");
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.data[0] === "Token is required"
      ) {
        toast.error("لطفا احراز هویت فرمایید");
        setIsModalOpen(true);
      } else {
        toast.error("مشکلی پیش آمد. لطفاً بعداً دوباره تلاش کنید");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mt-2">
        <button
          hidden={
            commentToReplyUsername === null || commentToreplyId === undefined
          }
          onClick={deleteReplyTo}
          className="rounded-xl px-2 py-1 bg-[#28d16c] mx-4 text-white text-xs "
        >
          {commentToReplyUsername} پاسخ به{" "}
          <span>
            <X className="inline-block w-4 h-4" />
          </span>
        </button>
        <div className="px-4 pt-2 mb-2 sm:mb-0">
          <div className="relative flex-1 overflow-hidden bg-[#EBEBEB] rounded-lg shadow-sm ring-1 ring-inset ring-gray-300">
            <TextareaAutosize
              style={{ direction: "rtl" }}
              ref={textareaRef}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`لطفا دیدگاه خودرا بنویسید . `}
              className="block w-full resize-none border-0 bg-transparent px-5 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:ring-transparent focus:outline-none py-1.5 sm:text-sm sm:leading-6"
            />

            <div
              onClick={() => textareaRef.current?.focus()}
              className="py-2"
              aria-hidden="true"
            >
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>
          <div className="flex py-4">
            <div className="flex-shrin-0">
              <Button
                disabled={isLoading}
                onClick={sendMessage}
                variant={"green"}
                size={"resizble"}
                type="submit"
              >
                <CaretLeftIcon className="h-8 w-8" /> <span>ارسال نظر</span>
              </Button>
            </div>
          </div>
          {isModalOpen && (
            <SignInModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatInput;
