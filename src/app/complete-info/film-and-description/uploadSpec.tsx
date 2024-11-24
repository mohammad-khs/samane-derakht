"use client";
import { FC, useState } from "react";
import DataLabel from "./dataLabel";
import TreeOccasion from "./treeOccasion";
import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import axios, { Axios, AxiosError } from "axios";
import { useCompleteInfoContext } from "@/context/completeInfo";

interface UploadSpecProps {
  session: Session;
}

const UploadSpec: FC<UploadSpecProps> = ({ session }) => {
  const [error, setError] = useState(null);
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
  } = useCompleteInfoContext();

  const handleAddOrderAPI = async () => {
    setLoading(true);
    setError(null);

    const markerIds: string[] = [];
    selectedMarkers.map((marker) => {
      markerIds.push(marker.id);
    });

    const ids = markerIds.join(",");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/api/addOrder/`,
        {
          user_type: customer,
          coords: ids,
          city_id: cityId,
          province_id: provinceId,
          theme_id: currentTheme.id,
          ...(email ? { email: email } : {}),
          ...(zipCode ? { zipcode: zipCode } : {}),
          ...(name ? customer === "HA" ? { name: name } : { organization: name }: {}),
          ...(videoFiles && { video: videoFiles[0].file }),
          // ...(imageFiles && imageFiles.length > 0 && { images: imageFiles }),
        },
        {
          headers: {
            Authorization: session.access ? `Bearer ${session.access}` : "",
            TOKEN: session.token || "",
          },
        }
      );
      console.log(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-4 sm:mx-24" dir="rtl">
        <TreeOccasion session={session} />
        <div className="border-b-2 border-[#A3A3A3] my-8"></div>
        <DataLabel />
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
            <Link onClick={handleAddOrderAPI} href={"film-and-description"}>
              <Button className="md:w-44" variant={"green"} size={"resizble"}>
                پرداخت نهایی
                <CaretLeftIcon className="h-8 w-8" />
              </Button>
            </Link>
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default UploadSpec;


// with form data 

// const formData = new FormData();

// formData.append("user_type", customer);
// formData.append("coords", JSON.stringify(ids));
// formData.append("city_id", cityId);
// formData.append("province_id", provinceId);
// formData.append("theme_id", currentTheme.id);
// formData.append("email", email);
// formData.append("zipcode", zipCode);

// if (customer === "HA") {
//   formData.append("name", name);
// } else {
//   formData.append("organization", name);
// }

// if (videoFiles && videoFiles[0]) {
//   formData.append("video", videoFiles[0].file);
// }

// if (imageFiles && imageFiles.length > 0) {
//   imageFiles.forEach((image,index) => {
//     formData.append(`images[${index}]`, image.file);
//   });
// }

// const response = await axios.post(
//   `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/api/addOrder/`,
//   formData,
//   {
//     headers: {
//       Authorization: session.access ? `Bearer ${session.access}` : "",
//       TOKEN: session.token || "",
//       "Content-Type": "multipart/form-data",
//     },
//   }
// );
