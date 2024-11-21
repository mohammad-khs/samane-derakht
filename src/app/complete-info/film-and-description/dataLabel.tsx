"use client";
import { Button } from "@/components/ui/button";
import { LucidePaperclip, Trash2 } from "lucide-react";
import { FC, useState } from "react";

import ImageUploader from "./imageUploader";

interface DataLabelProps {}

const DataLabel: FC<DataLabelProps> = () => {
  const [uploadSection, setUploadSection] = useState<
    "image" | "video" | "voice"
  >("image");
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
            <Button variant={"outline"}>
              <Trash2 className="w-4 h-4 ms-2 me-1 text-red-600" /> پاک کردن
              داده ها
            </Button>
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <Button
            onClick={(e) => setUploadSection("image")}
            variant={uploadSection === "image" ? "green" : "outline"}
          >
            آپلود عکس
          </Button>
          <Button
            onClick={(e) => setUploadSection("video")}
            variant={uploadSection === "video" ? "green" : "outline"}
          >
            آپلود محصول
          </Button>
          <Button
            onClick={(e) => setUploadSection("voice")}
            variant={uploadSection === "voice" ? "green" : "outline"}
          >
            آپلود ویس
          </Button>
        </div>
        <div className="border-b-2 border-[#A3A3A3] mb-8 mt-2"></div>
        <div className=" sm:px-10">
          {uploadSection === "image" && <ImageUploader />}
          {uploadSection === "video" && <div>video</div>}
          {uploadSection === "voice" && <div>voice</div>}
        </div>
      </div>
    </>
  );
};

export default DataLabel;
