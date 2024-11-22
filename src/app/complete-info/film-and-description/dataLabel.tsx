"use client";
import { Button } from "@/components/ui/button";
import { LucidePaperclip, Trash2 } from "lucide-react";
import { FC, useState } from "react";

import ImageUploader from "./imageUploader";
import VideoUploader from "./videoUploader";
import { useCompleteInfoContext } from "@/context/completeInfo";
import { FaCheck, FaImage, FaMicrophone, FaPlay } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface DataLabelProps {}

const DataLabel: FC<DataLabelProps> = () => {
  const [uploadSection, setUploadSection] = useState<
    "image" | "video" | "voice"
  >("image");
  const { imageFiles, videoFiles, setImageFiles, setVideoFiles } =
    useCompleteInfoContext();
  return (
    <>
      <div>
        <div className="flex justify-between flex-col sm:flex-row items-center mb-5 mt-8">
          <div>
            <h2 className="flex items-center gap-4 text-[#1F1F1F] font-semibold text-lg leading-6 mb-2">
              <LucidePaperclip className="text-[#5F6368] rotate-[-45deg]" />
              <span>برچسب اطلاعات</span>
            </h2>
            <p className="text-[#565656] text-xs ms-1">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
            </p>
          </div>
          <div className="flex justify-center mt-2 sm:mt-0 items-center">
            <Button
              onClick={(e) => [setImageFiles([]), setVideoFiles([])]}
              variant={"outline"}
            >
              <Trash2 className="w-4 h-4 ms-2 me-1 text-red-600" /> پاک کردن
              داده ها
            </Button>
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <Button
            onClick={(e) => setUploadSection("image")}
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
            onClick={(e) => setUploadSection("video")}
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
                  : "text-white bg-[#565656]"
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
            onClick={(e) => setUploadSection("voice")}
            variant={uploadSection === "voice" ? "green" : "lightGray"}
            size={"resizble"}
            className="gap-2"
          >
            <FaMicrophone className="w-4 h-4" />
            آپلود ویس
          </Button>
        </div>
        <div className="border-b-2 border-[#A3A3A3] mb-8 mt-2"></div>
        <div className=" sm:px-10">
          {uploadSection === "image" && <ImageUploader />}
          {uploadSection === "video" && <VideoUploader />}
          {/* {uploadSection === "voice" && <div>voice</div>} */}
        </div>
      </div>
    </>
  );
};

export default DataLabel;
