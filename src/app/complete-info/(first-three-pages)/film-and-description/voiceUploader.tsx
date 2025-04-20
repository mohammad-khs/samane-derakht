"use client";
import { Button } from "@/components/ui/button";
import { FileStatus } from "@/types/complete-info";
import { Trash2 } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { FaMicrophone } from "react-icons/fa";

interface VoiceUploaderProps {
  maxFiles?: number;
  audioFiles: FileStatus[];
  setAudioFiles: Dispatch<SetStateAction<FileStatus[]>>;
  notInPaymentSection?: boolean;
}

const VoiceUploader: FC<VoiceUploaderProps> = ({
  maxFiles = 1,
  audioFiles,
  setAudioFiles,
  notInPaymentSection = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (filesList: FileList | null) => {
    if (!filesList) return;

    const validFiles = Array.from(filesList)
      .filter((file) => {
        if (file.size > 10000000) {
          toast.error(`ویس نباید بیشتر از ۱۰ مگابایت باشد`);
          return false;
        }
        if (!file.type.startsWith("audio/")) {
          toast.error(`فایل باید یک ویس باشد`);
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

    if (audioFiles.length + validFiles.length > maxFiles) {
      toast.error(`حداکثر ${maxFiles} ویس مجاز است.`);
      return;
    }
    // Update state with valid files
    setAudioFiles((prevFiles) => [...prevFiles, ...validFiles]);

    // Simulate upload success

    setAudioFiles((prevFiles) =>
      prevFiles.map((f) =>
        validFiles.some((newFile) => newFile.id === f.id)
          ? { ...f, status: "uploaded" }
          : f
      )
    );
  };

  const handleFileRemove = (id: string) => {
    setAudioFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  return (
    <>
      <div>
        <h3 className="flex gap-4  items-center text-lg font-semibold mb-4">
          <div className="bg-[#565656] rounded-sm p-1">
             <FaMicrophone className="w-3 h-3 text-white" />
          </div>
          آپلود ویس
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
              //   multiple
              name="audio"
              accept="audio/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </label>
        </div>

        {/* Uploaded Files List */}
        <div>
          {audioFiles.map((file) => (
            <div
              className="flex flex-col md:flex-row gap-2 justify-center"
              key={file.id}
            >
              <div className="flex items-center w-full lg:w-8/12 justify-between p-2 mb-2">
                <div className="w-full">
                  <audio className="w-full" controls>
                    <source
                      src={URL.createObjectURL(file.file)}
                      type="audio/mpeg"
                    />
                    مرورگر شما این فایل صوتی را پشتیبانی نمیکند
                  </audio>
                </div>
              </div>
              <div className="flex justify-center gap-2 items-center text-center">
                <Button
                  onClick={() => handleFileRemove(file.id)}
                  variant={"outline"}
                >
                  <Trash2 className="w-4 h-4 ms-2 me-1 text-red-600" /> حذف
                </Button>
                <div>
                  {file.status === "uploaded" ? (
                    <span className="text-green-500 text-xs sm:text-sm">
                      آپلود شده
                    </span>
                  ) : (
                    <span className="text-yellow-500 text-xs sm:text-sm">
                      در حال آپلود
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VoiceUploader;
