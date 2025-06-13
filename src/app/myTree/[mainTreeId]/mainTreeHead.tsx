import { DateFormatDMY, monthNumToMonthName } from "@/helper/dateHandler";
import {
  Clock,
  ImageIcon,
  Loader2Icon,
  PlayCircle,
  ScanQrCode,
} from "lucide-react";
import { FC } from "react";
import { FaMapMarkerAlt, FaMicrophone, FaRegCommentAlt } from "react-icons/fa";
import UserImage from "./userImage";
import { MyMainTreeData } from "./page";
import Image from "next/image";
import ImageCarousel from "./imageCarousel";
import Video from "@/components/ui/video";
import dynamic from "next/dynamic";
import { Session } from "next-auth";
import SaveAndDelete from "./saveAndDelete";
import EditButton from "./editButton";

const DynamicModalMap = dynamic(
  () => import("@/app/dashboard/trees/modalMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center">
        <Loader2Icon className="animate-spin text-[#28D16C] h-12 w-12" />
      </div>
    ),
  }
);

interface MainTreeHeadProps {
  data: MyMainTreeData;
  session: Session | null;
}

const MainTreeHead: FC<MainTreeHeadProps> = ({ data, session }) => {
  const timeJoined = DateFormatDMY(data.data.time_joined);
  const timeCreated = DateFormatDMY(data.data.irani_time);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="relative h-12 w-12 ">
            <UserImage imageUrl={data.data.image} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{data.data.user_username}</h3>
            <div className="text-[#5F6368] text-xs sm:text-sm">
              {timeJoined ? (
                <span>
                  عضویت :‌ از {timeJoined?.day}/{timeJoined?.month}/
                  {timeJoined?.year}
                </span>
              ) : (
                <span>زمان عضویت نامشخص</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <EditButton data={data} />

          <SaveAndDelete data={data} session={session} />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-5">
        {data.data.title ? (
          <span className="block max-w-full md:w-3/4 truncate">
            {data.data.title}
          </span>
        ) : (
          <span>بدون عنوان</span>
        )}
      </h3>
      <div className="flex gap-3 md:gap-8 mt-2">
        <div className="text-xs sm:text-sm flex gap-2  items-center">
          <Clock className="h-5 w-5 text-[#F2B93B]" />{" "}
          {timeCreated ? (
            <div className="">
              {timeCreated?.year} {monthNumToMonthName(timeCreated.month)}{" "}
              {timeCreated?.day}
            </div>
          ) : (
            <span className="text-xs sm:text-sm">نامشخص</span>
          )}
        </div>
        <div className="flex text-xs sm:text-sm gap-2 items-center">
          <FaRegCommentAlt className="h-4 w-4 text-[#F2B93B]" />
          {data.data.comment_numbers} کامنت
        </div>
        <div className="flex text-xs sm:text-sm gap-2 items-center">
          <ScanQrCode className="h-5 w-5 text-[#F2B93B]" />{" "}
          <div>
            <span>{data.data.scan_numbers}</span> اسکن
          </div>
        </div>
      </div>

      {data.data.image ? (
        <div className="border-2 border-[#D2D2D2] p-1 rounded-3xl w-full sm:w-[480px] h-[320px] my-4">
          <div className="relative w-full h-full">
            <Image
              alt={`تصویر درخت ${data.data.user_username}`}
              fill
              className="rounded-3xl object-cover"
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.data.image}`}
            />
          </div>{" "}
        </div>
      ) : (
        ""
      )}

      <div>
        <p className="text-sm md:text-base mt-5">{data.data.description}</p>
      </div>

      <div className="flex justify-center items-center w-full mt-6">
        <div className="flex justify-center items-center">
          <div className="bg-[#28D16C26] flex justify-center items-center rounded-full p-2">
            <ImageIcon className="text-[#28D16C] w-5 h-5" />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="sm:text-xl text-lg text-center font-semibold w-[85px]">
              گالری ها
            </h2>
          </div>
        </div>
        <div className="border-b-2 border-b-[#E1E1E1] w-full"></div>
      </div>
      {data.data.images_list[0].length > 0 ? (
        <div className="mb-8 relative">
          <ImageCarousel
            background="bg-white"
            hasPrevNextBtn={true}
            cardsData={data.data.images_list[0]}
          />
        </div>
      ) : (
        <div className="text-red-600 font-semibold m-3 ">بدون عکس</div>
      )}

      <div className="flex justify-center items-center w-full mt-6">
        <div className="flex justify-center items-center">
          <div className="bg-[#28D16C26] flex justify-center items-center rounded-full p-2">
            <PlayCircle className="text-[#28D16C] w-5 h-5" />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="sm:text-xl text-lg text-center font-semibold w-[85px]">
              ویدیو
            </h2>
          </div>
        </div>
        <div className="border-b-2 border-b-[#E1E1E1] w-full"></div>
      </div>
      {data.data.video ? (
        <div className=" border-[#D2D2D2] p-1 flex justify-center items-center rounded-lg w-full h-full sm:w-[480px] sm:h-[320px] my-8 sm:my-0">
          <Video
            vidoAddress={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.data.video}`}
          />
        </div>
      ) : (
        <div className="text-red-600 font-semibold m-3 ">بدون ویدیو</div>
      )}

      <div className="flex justify-center items-center w-full mt-6">
        <div className="flex justify-center items-center">
          <div className="bg-[#28D16C26] flex justify-center items-center rounded-full p-2">
            <FaMicrophone className="text-[#28D16C] w-5 h-5" />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="sm:text-xl text-lg text-center font-semibold w-[85px]">
              ویس
            </h2>
          </div>
        </div>
        <div className="border-b-2 border-b-[#E1E1E1] w-full"></div>
      </div>
      {data.data.voice ? (
        <div className="flex items-center w-full lg:w-8/12 justify-between p-2 my-8">
          <div className="w-full">
            <audio className="w-full" controls>
              <source
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.data.voice}`}
                type="audio/mpeg"
              />
              مرورگر شما این فایل صوتی را پشتیبانی نمیکند
            </audio>
          </div>
        </div>
      ) : (
        <div className="text-red-600 font-semibold m-3 ">بدون ویس</div>
      )}

      <div className="flex justify-center items-center w-full mt-6">
        <div className="flex justify-center items-center">
          <div className="bg-[#28D16C26] flex justify-center items-center rounded-full p-2">
            <FaMapMarkerAlt className="text-[#28D16C] w-5 h-5" />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="sm:text-xl text-lg text-center font-semibold w-[195px] sm:w-[220px]">
              آدرس درخت کاشته شده
            </h2>
          </div>
        </div>
        <div className="border-b-2 border-b-[#E1E1E1] w-full"></div>
      </div>
      <div className="md:w-3/4 w-full my-8">
        <DynamicModalMap
          mapCenter={[
            parseFloat(data.data.latitud),
            parseFloat(data.data.longtitud),
          ]}
        />
      </div>
    </>
  );
};

export default MainTreeHead;
