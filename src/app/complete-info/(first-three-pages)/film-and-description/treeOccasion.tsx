"use client";

import axios, { AxiosError } from "axios";
import { Session } from "next-auth";
import { FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaTree } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import ThemeSelector from "./themeSelector";
import { useCompleteInfoContext } from "@/context/completeInfo";
import { TreeOccasionType } from "@/types/complete-info";

interface TreeOccasionProps {
  session: Session;
}



const TreeOccasion: FC<TreeOccasionProps> = ({ session }) => {
  const [themes, setThemes] = useState<TreeOccasionType[]>([]);

  const { setCurrentTheme, description, setDescription } =
    useCompleteInfoContext();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    try {
      const fetchTreeOccasion = async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/api/thirdData/`,
          {
            headers: {
              Authorization: session.access ? `Bearer ${session.access}` : "",
              TOKEN: session.token || "",
            },
          }
        );
        if (res.status !== 200) {
          throw new AxiosError();
        } else {
          setThemes(res.data);
          setCurrentTheme(res.data[0]);
        }
      };
      fetchTreeOccasion();
    } catch (error: any) {
      console.log(typeof error);

      console.error("Error fetching treeTheme:", error);

      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          toast.error("تم درختان یافت نشد");
        } else {
          toast.error("خطا در بارگذاری اطلاعات");
        }
      } else {
        toast.error("خطای غیرمنتظره‌ای رخ داد");
      }

      setThemes([]);
    }
  }, []);

  return (
    <>
      <h2 className="flex items-center gap-4 text-[#1F1F1F] font-semibold text-lg leading-6 mt-8 mb-6">
        <FaTree className="text-[#5F6368]" /> <span>مشخصات و مناسبت درخت</span>
      </h2>
      <div className="mb-2 text-sm">
        <div>تم درخت</div>
      </div>
      <ThemeSelector themes={themes} />
      <div className="mt-6 text-sm">
        <label htmlFor="tree-description">توضیحات درخت</label>
      </div>
      <div className="pt-2 mb-2 sm:mb-0">
        <div className="relative flex-1 overflow-hidden bg-[#EBEBEB] rounded-lg shadow-sm ring-1 ring-inset ring-gray-300">
          <TextareaAutosize
            style={{ direction: "rtl" }}
            ref={textareaRef}
            rows={1}
            id="tree-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`داستان کاشت این درخت...`}
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
    </>
  );
};

export default TreeOccasion;
