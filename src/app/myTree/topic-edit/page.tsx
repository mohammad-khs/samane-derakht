"use client";

import DataLabel from "@/app/complete-info/(first-three-pages)/film-and-description/dataLabel";
import { Input } from "@/components/ui/input";
import { FileStatus } from "@/types/complete-info";
import { FC, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";


const TopicEdit: FC = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState<FileStatus[]>([]);
  const [videoFiles, setVideoFiles] = useState<FileStatus[]>([]);
  const [audioFiles, setAudioFiles] = useState<FileStatus[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <>
      <h1 className="text-xl font-semibold my-4">نوشتن تاپیک جدید</h1>
      <div className="w-full rounded-lg bg-white p-4 sm:p-8 text-[#1F1F1F]">
        <h2 className="text-lg font-semibold">جزئیات تاپیک</h2>
        <div className="mt-5">
          <div className="flex flex-col  items-center md:items-start">
            <label className="text-sm text-[#1F1F1F]" htmlFor="ticket-subject">
              عنوان تاپیک
            </label>
            <div className="w-80">
              <Input
                className="my-3 w-full "
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
          <div>
            <label
              className="text-sm text-[#1F1F1F]"
              htmlFor="ticket-explaination"
            >
              متن تاپیک
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
                  placeholder={`لطفا متن تاپیک خود را بنویسید`}
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
              <DataLabel
                audioFiles={audioFiles}
                imageFiles={imageFiles}
                setAudioFiles={setAudioFiles}
                setImageFiles={setImageFiles}
                setVideoFiles={setVideoFiles}
                videoFiles={videoFiles}
                notInPaymentSection={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicEdit;
