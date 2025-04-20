"use client";

import { FileStatus } from "@/types/complete-info";
import { X } from "lucide-react";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";

interface ImageUploaderProps {
  maxFiles?: number;
  imageFiles: FileStatus[];
  setImageFiles: Dispatch<SetStateAction<FileStatus[]>>;
  notInPaymentSection: boolean;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  maxFiles = 10,
  imageFiles,
  setImageFiles,
  notInPaymentSection,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (filesList: FileList | null) => {
    if (!filesList) return;

    const validFiles = Array.from(filesList)
      .filter((file) => {
        if (file.size > 3000000) {
          toast.error(`تصویر نباید بیشتر از ۳ مگابایت باشد`);
          return false;
        }
        if (!file.type.startsWith("image/")) {
          toast.error(`فایل باید یک تصویر باشد`);
          return false;
        }
        return true;
      })
      .map((file) => ({
        id: crypto.randomUUID(),
        file, // Store the actual file
        name: file.name,
        status: "uploading" as const,
      }));

    if (imageFiles.length + validFiles.length > maxFiles) {
      toast.error(`حداکثر ${maxFiles} تصویر مجاز است.`);
      return;
    }
    // Update state with valid files
    setImageFiles((prevFiles) => [...prevFiles, ...validFiles]);

    // Simulate upload success

    setImageFiles((prevFiles) =>
      prevFiles.map((f) =>
        validFiles.some((newFile) => newFile.id === f.id)
          ? { ...f, status: "uploaded" }
          : f
      )
    );
  };

  const handleFileRemove = (id: string) => {
    setImageFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  return (
    <div>
      <h3 className="flex gap-4 items-center text-lg font-semibold mb-4">
        <FaImage className="text-[#565656]" />
        آپلود عکس
      </h3>
      {notInPaymentSection ? (
        ""
      ) : (
        <p className="text-xs text-[#565656] mb-2">
          {/* افزودن این قابلیت باعث اضاف شدن هزینه پرداخت میشود */}
        </p>
      )}

      {/* Drag-and-Drop Area */}
      <div
        className={`border-2 border-dashed bg-[#EBEBEB] border-gray-300 rounded-lg p-4 flex items-center justify-center mb-4 ${
          isDragging ? "bg-green-200" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileUpload(e.dataTransfer.files);
        }}
      >
        <label className="flex flex-col items-center cursor-pointer">
          <span className="text-green-600 font-medium mb-2">
            فایل خود را اینجا رها کنید
          </span>
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg">
            انتخاب فایل
          </div>
          <input
            type="file"
            multiple
            name="image"
            accept="image/*" // Only accept image files
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
        </label>
      </div>

      {/* Uploaded Files List */}
      <div>
        {imageFiles.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between border rounded-md p-2 mb-2 "
          >
            <span className="text-xs sm:text-sm">{file.name}</span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {file.status === "uploaded" ? (
                <span className="text-green-500 text-xs sm:text-sm">
                  آپلود شده
                </span>
              ) : (
                <span className="text-yellow-500 text-xs sm:text-sm">
                  در حال آپلود
                </span>
              )}
              <button
                onClick={() => handleFileRemove(file.id)}
                className="text-red-600  rounded-full text-xs sm:text-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
