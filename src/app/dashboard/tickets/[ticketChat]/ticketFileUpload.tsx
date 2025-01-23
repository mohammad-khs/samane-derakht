"use client";
import { FileStatus } from "@/types/complete-info";
import { LucidePaperclip, Pin, PinIcon, X } from "lucide-react";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface TicketFileUploaderProps {
  maxFiles?: number;
  files: FileStatus[];
  setFiles: Dispatch<SetStateAction<FileStatus[]>>;
}

const TicketFileUploader: FC<TicketFileUploaderProps> = ({
  maxFiles = 10,
  files,
  setFiles,
}) => {
  const handleFileUpload = (filesList: FileList | null) => {
    if (!filesList) return;

    const validFiles = Array.from(filesList)
      .filter((file) => {
        if (file.size > 2000000) {
          toast.error(`تصویر نباید بیشتر از ۲ مگابایت باشد`);
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

    if (files.length + validFiles.length > maxFiles) {
      toast.error(`حداکثر ${maxFiles} تصویر مجاز است.`);
      return;
    }
    // Update state with valid files
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);

    // Simulate upload success

    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        validFiles.some((newFile) => newFile.id === f.id)
          ? { ...f, status: "uploaded" }
          : f
      )
    );
  };

  const handleFileRemove = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  return (
    <div className="flex gap-4">
      <label className="flex flex-col items-center cursor-pointer">
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg">
          انتخاب فایل
        </div>
        <input
          type="file"
          name="file"
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </label>

      {/* Uploaded Files List */}
      <div className="">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex bg-white items-center justify-between gap-1 border rounded-md p-2 mb-2 "
          >
            <span className="text-xs sm:text-sm truncate w-16">{file.name}</span>
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

export default TicketFileUploader;
