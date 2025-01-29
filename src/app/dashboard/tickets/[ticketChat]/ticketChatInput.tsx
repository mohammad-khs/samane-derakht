"use client";

import axios from "axios";
import { Session } from "next-auth";
import { FC, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import TicketFileUploader from "./ticketFileUpload";
import { FileStatus } from "@/types/complete-info";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { mutate } from "swr";

interface TicketChatInputProps {
  chatId: string;
  session: Session | null;
}

const TicketChatInput: FC<TicketChatInputProps> = ({ chatId, session }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [files, setFiles] = useState<FileStatus[]>([]);

  const sendMessage = async () => {
    if (!input.trim() && files.length === 0) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("message", input);
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append(`file`, file.file);
      });
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/sendticketMessage/${chatId}/`,
        formData,
        {
          headers: {
            Authorization: session?.access ? `Bearer ${session.access}` : "",
            TOKEN: session?.token || "",
          },
        }
      );

      if (res.status === 200) {
        // Trigger SWR revalidation
        mutate(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/myticketmessage/${chatId}`
        );
        setInput("");
        setFiles([]);
        textareaRef.current?.focus();
      }
    } catch {
      toast.error("مشکلی پیش آمد لطفا دوباره سعی کنید");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-[#28D16C]">
        <TextareaAutosize
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
          placeholder={`ارسال متن`}
          className="block w-full resize-none border-0 bg-transparent px-5 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:ring-transparent focus:outline-none py-2 sm:text-sm sm:leading-6"
        />
        <button
          disabled={isLoading}
          className="absolute left-2 top-2"
          onClick={sendMessage}
          type="submit"
        >
          {isLoading ? (
            <Loader2 className="w-8 h-8 animate-spin text-[#28D16C]" />
          ) : (
            <PaperPlaneIcon className="text-[#28D16C] w-6 h-6 rotate-180" />
          )}
        </button>
        <div
          onClick={() => textareaRef.current?.focus()}
          className="py-2"
          aria-hidden="true"
        >
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div>

        <div className="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex-shrink-0">
            <TicketFileUploader
              files={files}
              setFiles={setFiles}
              maxFiles={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketChatInput;
