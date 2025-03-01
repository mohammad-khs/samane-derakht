"use client";
import { Button } from "@/components/ui/button";
import { LucidePaperclip, Trash2 } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";

import ImageUploader from "./imageUploader";
import VideoUploader from "./videoUploader";
import { FaCheck, FaImage, FaMicrophone, FaPlay } from "react-icons/fa";
import { cn } from "@/lib/utils";
import VoiceUploader from "./voiceUploader";
import { FileStatus } from "@/types/complete-info";

interface DataLabelProps {
  imageFiles: FileStatus[];
  videoFiles: FileStatus[];
  audioFiles: FileStatus[];
  setImageFiles: Dispatch<SetStateAction<FileStatus[]>>;
  setVideoFiles: Dispatch<SetStateAction<FileStatus[]>>;
  setAudioFiles: Dispatch<SetStateAction<FileStatus[]>>;
  notInPaymentSection?: boolean
}

const DataLabel: FC<DataLabelProps> = ({
  imageFiles,
  videoFiles,
  setImageFiles,
  setVideoFiles,
  audioFiles,
  setAudioFiles,
  notInPaymentSection = false,
}) => {
  const [uploadSection, setUploadSection] = useState<
    "image" | "video" | "voice"
  >("image");

  return (
    <>
      <div>
        <div className="md:flex justify-between flex-col sm:flex-row items-center mb-5 mt-8">
          <div>
            <h2 className="flex items-center gap-4 text-[#1F1F1F] font-semibold text-lg leading-6 mb-2">
              <LucidePaperclip className="text-[#5F6368] rotate-[-45deg]" />
              <span>برچسب اطلاعات</span>
            </h2>
            <p className="text-[#565656] text-xs ms-1">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
            </p>
          </div>
          <div className="mt-2 md:mt-0 items-center">
            <Button
              onClick={() => [
                setImageFiles([]),
                setVideoFiles([]),
                setAudioFiles([]),
              ]}
              variant={"outline"}
            >
              <Trash2 className="w-4 h-4 ms-2 me-1 text-red-600" /> پاک کردن
              داده ها
            </Button>
          </div>
        </div>
        <div className="flex gap-1 sm:gap-4 mt-8">
          <Button
            onClick={() => setUploadSection("image")}
            variant={
              uploadSection === "image"
                ? "green"
                : imageFiles.length > 0
                ? "approved"
                : "lightGray"
            }
            size={"resizble"}
            className="gap-2"
          >
            <FaImage className="w-4 h-4" />
            آپلود عکس
            {imageFiles.length > 0 && (
              <div className="hidden sm:flex justify-center items-center rounded-full bg-[#28D16C] w-4 h-4">
                <FaCheck className=" w-[10px] h-[10px] text-white" />
              </div>
            )}
          </Button>
          <Button
            onClick={() => setUploadSection("video")}
            variant={
              uploadSection === "video"
                ? "green"
                : videoFiles.length > 0
                ? "approved"
                : "lightGray"
            }
            size={"resizble"}
            className="gap-2"
          >
            <div
              className={`${cn(
                "rounded-sm p-1",
                uploadSection === "video"
                  ? "text-[#28D16C] bg-white"
                  : "text-white bg-[#898989]"
              )}`}
            >
              <FaPlay className="w-2 h-2" />
            </div>
            آپلود فیلم
            {videoFiles.length > 0 && (
              <div className="hidden sm:flex justify-center items-center rounded-full bg-[#28D16C] w-4 h-4">
                <FaCheck className=" w-[10px] h-[10px] text-white" />
              </div>
            )}
          </Button>
          <Button
            onClick={() => setUploadSection("voice")}
            variant={
              uploadSection === "voice"
                ? "green"
                : audioFiles.length > 0
                ? "approved"
                : "lightGray"
            }
            size={"resizble"}
            className="gap-2"
          >
            <FaMicrophone className="w-4 h-4" />
            آپلود ویس
            {audioFiles.length > 0 && (
              <div className="hidden sm:flex justify-center items-center rounded-full bg-[#28D16C] w-4 h-4">
                <FaCheck className=" w-[10px] h-[10px] text-white" />
              </div>
            )}
          </Button>
        </div>
        <div className="border-b-2 border-[#A3A3A3] mb-8 mt-2"></div>
        <div className=" sm:px-10">
          {uploadSection === "image" && (
            <ImageUploader
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
              notInPaymentSection={notInPaymentSection}
            />
          )}
          {uploadSection === "video" && (
            <VideoUploader
              videoFiles={videoFiles}
              setVideoFiles={setVideoFiles}
              notInPaymentSection={notInPaymentSection}
            />
          )}
          {uploadSection === "voice" && (
            <VoiceUploader
              audioFiles={audioFiles}
              setAudioFiles={setAudioFiles}
              notInPaymentSection={notInPaymentSection}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DataLabel;
