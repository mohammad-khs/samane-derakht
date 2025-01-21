"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { FC, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import TicketImageUploader from "./ticketImageUploader";
import toast from "react-hot-toast";
import axios from "axios";
import { Session } from "next-auth";
import { FileStatus } from "@/types/complete-info";
import { redirect, useRouter } from "next/navigation";

interface AddTicketSectionProps {
  session: Session | null;
}

const AddTicketSection: FC<AddTicketSectionProps> = ({ session }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState<FileStatus[]>([]);
  const router = useRouter();
  const handleSubmitTicket = async () => {
    if (subject.length < 4) {
      toast.error("عنوان تیکت کوتاه است");
      return;
    }
    if (description.length < 4) {
      toast.error("شرح توضیحات کوتاه است");
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);

    formData.append("description", description);

    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((image) => {
        formData.append(`file`, image.file);
      });
    }

    try {
      console.log(imageFiles[0]?.file);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/sendTicket/`,
        formData,
        {
          headers: {
            Authorization: session?.access ? `Bearer ${session.access}` : "",
            TOKEN: session?.token || "",
          },
        }
      );

      if (response.status === 200) {
        toast.success("با موفقیت انجام شد");
        console.log(response.data);
        router.replace("/dashboard/tickets");
      }
      if (response.status === 404) {
        toast.error("منطقه مورد نظر یافت نشد");
        return;
      }
    } catch (error: any) {
      console.error("Error in sending tikcet:", error);

      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          toast.error("منطقه مورد نظر یافت نشد");
        } else {
          toast.error("خطا در بارگذاری اطلاعات");
        }
      } else {
        toast.error("خطای غیرمنتظره‌ای رخ داد");
      }
    }
  };
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <>
      <h1 className="text-2xl mb-4">ثبت تیکت</h1>
      <div className="rounded-xl bg-white ">
        <br />
        <div className=" mx-4 sm:mx-24" dir="rtl">
          <div className="mr-4">
            <div className="gap-8">
              <div className="flex flex-col  items-center md:items-start">
                <label
                  className="text-sm text-[#1F1F1F]"
                  htmlFor="ticket-subject"
                >
                  عنوان تیکت
                </label>
                <div className="w-64">
                  <Input
                    className="my-3 w-full"
                    id="ticket-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    type="text"
                    variant="default"
                    size="default"
                    placeholder="لطفا عنوان درخواست خود را بنویسید"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                className="text-sm text-[#1F1F1F]"
                htmlFor="ticket-explaination"
              >
                شرح توضیحات
              </label>
              <div className="pt-2 mb-2 sm:mb-0">
                <div className="relative flex-1 overflow-hidden bg-[#EBEBEB] rounded-lg shadow-sm ring-1 ring-inset ring-gray-300">
                  <TextareaAutosize
                    style={{ direction: "rtl" }}
                    ref={textareaRef}
                    rows={1}
                    id="ticket-explaination"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={`لطفا متن درخواست خود را بنویسید`}
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
              </div>
            </div>

            <div className="mt-4">
              <TicketImageUploader
                maxFiles={1}
                imageFiles={imageFiles}
                setImageFiles={setImageFiles}
              />
            </div>
          </div>

          <div className="w-full flex justify-end mt-8">
            <Button
              onClick={handleSubmitTicket}
              className="md:w-44"
              variant={"green"}
              size={"resizble"}
            >
              ذخیره اطلاعات
              <CaretLeftIcon className="h-8 w-8" />
            </Button>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default AddTicketSection;
