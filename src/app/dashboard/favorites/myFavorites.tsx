"use client";

import { DateFormatDMY, monthNumToMonthName } from "@/helper/dateHandler";
import axios from "axios";
import { Loader2, ScanQrCode, Trash2 } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { FaRegCommentAlt, FaStar } from "react-icons/fa";

interface MyFavoritesProps {
  session: Session;
}

interface favoriteType {
  avg: number | null;
  breif_description: string;
  count: number;
  id: string;
  scan_numbers: number;
  time_irani: string;
  tree_name: string;
}

const MyFavorites: FC<MyFavoritesProps> = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<favoriteType[]>([]);

  const handleDeleteFavorite = async (id: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/remove-fav/${id}/`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );

      if (response.status === 200) {
        if (response.data?.removed === true && response.data.added === false) {
          setData((prev) => {
            return prev.filter((favorite) => favorite.id !== id);
          });
        }
      }
    } catch (error) {
      console.error("Error fetching favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  const savedTrees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/mysaved/`,
        {
          headers: {
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );
      if (response.status === 200) {
        setData(response.data);
        console.log("this is data of favorite", response.data);
      }
    } catch (error) {
      console.error("Error fetching favorite:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    savedTrees();
  }, []);
  if (loading) {
    return (
      <div className="w-full h-full justify-center items-center flex">
        <Loader2 className="animate-spin w-20 h-20 text-[#28D16C]" />
      </div>
    );
  }
  return (
    <>
      {data.length > 0 ? (
        data.map((item: favoriteType) => {
          const timeCreated = DateFormatDMY(item.time_irani);
          return (
            <div
              key={item.id}
              className="mb-2 p-4 rounded-md bg-gray-100 flex flex-col-reverse gap-4 md:gap-0 md:flex-row-reverse  md:justify-between items-center"
            >
              <Trash2
                onClick={() => handleDeleteFavorite(item.id)}
                className="text-[#F97272] hover:cursor-pointer"
              />

              <div className="text-sm">
                <div className="flex gap-3 md:gap-8 mt-2">
                  <div className="text-[#247C48] underline text-xs">
                    <Link href={`/myTree/${item?.id}`}>مشاهده درخت</Link>
                  </div>
                  <div className="text-xs sm:text-sm flex gap-2 items-center ">
                    <FaStar className=" text-[#5F6368]" />{" "}
                    {item.avg?.toFixed(1) || 0}
                  </div>

                  <div className="flex text-xs sm:text-sm gap-2 items-center">
                    <FaRegCommentAlt className="h-4 w-4 text-[#5F6368]" />
                    {item.count} کامنت
                  </div>
                  <div className="flex text-xs sm:text-sm gap-2 items-center">
                    <ScanQrCode className="h-5 w-5 text-[#5F6368]" />{" "}
                    <div>
                      <span>{item.scan_numbers}</span> اسکن
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto justify-center md:justify-normal items-center">
                <div>
                  <div>
                    <span className="text-[#1F1F1F]">
                      نهال درخت {item.tree_name}
                    </span>{" "}
                    {timeCreated ? (
                      <span className="text-xs text-[#8B8B8B]">
                        از
                        {timeCreated?.year}{" "}
                        {monthNumToMonthName(timeCreated.month)}{" "}
                        {timeCreated?.day}
                      </span>
                    ) : (
                      <span className="text-xs sm:text-sm">نامشخص</span>
                    )}
                  </div>
                  <div className="text-xs text-center mt-2 sm:text-start text-[#8B8B8B]">
                    {item.breif_description}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="font-semibold mt-8 text-[#373737]">
          لیست علاقه‌مندی شما اینجا نمایش داده میشود
        </p>
      )}
    </>
  );
};

export default MyFavorites;
