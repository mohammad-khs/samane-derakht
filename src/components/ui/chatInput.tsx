"use client";

import { Button } from "@/components/ui/button";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import SignInModal from "../authentication/signInModal";
import { useCommentAndChatSectionContext } from "@/app/products/[productName]/commentAndChatSection";

interface ChatInputProps {}

const ChatInput: FC<ChatInputProps> = () => {
  const { productId, setUserComment, textareaRef, commentToreplyId, session } =
    useCommentAndChatSectionContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const randomUUID = () => Math.random().toString(36).substring(2, 15);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      await axios.post(
        `https://treeone.liara.run/order/api/${
          commentToreplyId ? `replyComment` : `addComment`
        }/${productId}/${commentToreplyId ? `${commentToreplyId}/` : ""}`,
        { text: input },
        {
          headers: {
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );

      setUserComment({
        child: [],
        created: new Date().toISOString(),
        id: randomUUID(),
        irani: "",
        text: input,
        user_profileimage: "",
        user_username: "شما",
      });
      setInput("");
      toast.success("پیام شما با موفقیت ثبت شد");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
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
    <div className="px-4 pt-4 mb-2 sm:mb-0">
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
  );
};

export default ChatInput;
