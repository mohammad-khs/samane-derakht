"use client";
import { FC, FormEvent, useState } from "react";
import DataLabel from "./dataLabel";
import TreeOccasion from "./treeOccasion";
import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { useCompleteInfoContext } from "@/context/completeInfo";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Authority } from "@/types/complete-info";

interface UploadSpecProps {
  session: Session;
}

const UploadSpec: FC<UploadSpecProps> = ({ session }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    customer,
    selectedMarkers,
    cityId,
    provinceId,
    currentTheme,
    email,
    name,
    zipCode,
    imageFiles,
    videoFiles,
    audioFiles,
    description,
    setAuthority,
    setAudioFiles,
    setVideoFiles,
    setImageFiles,
  } = useCompleteInfoContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!selectedMarkers.length) {
      toast.error("لطفا به تعداد آیتم های سبد خرید مکان انتخاب کنید");
      return;
    }
    if (!description) {
      toast.error("لطفا توضیحی درباره محصول یا محصولات ارائه فرماید");
      return;
    }

    setLoading(true);
    const markerIds: string[] = [];
    selectedMarkers.map((marker) => {
      markerIds.push(marker.id);
    });

    const ids = markerIds.join(",");

    try {
      const formData = new FormData();
      formData.append("coords", ids);
      formData.append("city_id", cityId);
      formData.append("province_id", provinceId);
      formData.append("theme_id", currentTheme.id);
      formData.append("description", description);
      //after fixing the bug take user_type under name condition ....
      formData.append("user_type", customer);

      if (name) {
        formData.append("email", email);
        if (customer === "HA") {
          formData.append("name", name);
        } else {
          formData.append("zipcode", zipCode);
          formData.append("organization", name);
        }
      }

      if (videoFiles && videoFiles[0]) {
        formData.append("video", videoFiles[0].file);
      }
      if (audioFiles && audioFiles[0]) {
        formData.append("voice", audioFiles[0].file);
      }

      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((image) => {
          formData.append(`images`, image.file);
        });
      }

      // Send API request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/api/addOrder/`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: session.access ? `Bearer ${session.access}` : "",
            TOKEN: session.token || "",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = (await response.json()) as Authority;
      console.log("this is the first data : ", data);

      setAuthority(data);
      console.log("Success");
      toast.success("اطلاعات شما با موفقیت آپلود شد");
      router.push("payment");
    } catch (err: unknown) {
      setAuthority(null);
      console.error("Error:", err);
      if (err === "email is not valid") {
        toast.error("ایمیلتان اشتباه است");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-4 sm:mx-24" dir="rtl">
        <TreeOccasion session={session} />
        <div className="border-b-2 border-[#A3A3A3] my-8"></div>
        <DataLabel
          audioFiles={audioFiles}
          imageFiles={imageFiles}
          videoFiles={videoFiles}
          setAudioFiles={setAudioFiles}
          setImageFiles={setImageFiles}
          setVideoFiles={setVideoFiles}
          notInPaymentSection={false}
        />
        <div className="flex justify-end gap-4">
          <div className="flex justify-end mt-8">
            <Link href={"city-and-district"}>
              <Button
                className="md:w-44 bg-[#E4E4E4] text-[#3D3D3D]"
                variant={"green"}
                size={"resizble"}
              >
                <CaretRightIcon className="h-8 w-8 text-[#3D3D3D]" />
                مرحله قبل
              </Button>
            </Link>
          </div>
          <div className="flex justify-end mt-8">
            <form onSubmit={handleSubmit}>
              <Button
                disabled={loading}
                type="submit"
                className="md:w-44"
                variant={"green"}
                size={"resizble"}
              >
                {loading ? (
                  <div className="flex w-16 md:w-full justify-center items-center">
                    <Loader2 className="animate-spin  text-white" />
                  </div>
                ) : (
                  <>
                    <span>پرداخت نهایی</span>
                    <CaretLeftIcon className="h-8 w-8" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        <br />
      </div>
    </>
  );
};

export default UploadSpec;
