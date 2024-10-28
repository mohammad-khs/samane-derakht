import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from "@/helper/formatNumberWithCommas";
import { TreeData } from "@/types/products";
import { BellIcon, Frown, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { FaCommentAlt, FaShareAlt, FaStar, FaTruck } from "react-icons/fa";

interface TreeHeadInfoProps {
  treeData: TreeData;
}

const TreeHeadInfo: FC<TreeHeadInfoProps> = ({ treeData }) => {
  return (
    <>
      <section className="bg-white rounded-xl flex flex-col-reverse lg:flex-row justify-between p-5 mx-5 my-10">
        <div className="flex flex-col h-full m-5 justify-between">
          <div className="flex mt-5 lg:mt-0 mb-10 lg:mb-24">
            <div className="basis-1/4 m-2">
              <div>
                <BellIcon className="text-[#5F6368] w-5 h-5 mb-3" />
              </div>
              <div>
                <FaShareAlt className="text-[#5F6368] w-5 h-5" />
              </div>
            </div>
            <div className="basis-3/4">
              <div className="mb-5">
                <h1
                  className="text-2xl font-semibold"
                  style={{ direction: "rtl" }}
                >
                  خرید نهال {treeData.tree?.name}
                </h1>
              </div>
              <p className="text-[#373737] text-sm mb-5">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است چاپگرها و متون بلکه
              </p>
              <div className="text-sm my-2" style={{ direction: "rtl" }}>
                {treeData.tree?.in_stock ? (
                  <div className="flex items-center gap-2">
                    <span className="bg-[#28D16C] rotate-45 rounded w-3 h-3 inline-block"></span>{" "}
                    وضعیت:
                    <span className="text-[#484848] text-xs">
                      موجود در انبار
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 rotate-45 rounded w-3 h-3 inline-block"></span>{" "}
                    وضعیت:
                    <span className="text-[#484848] text-xs">ناموجود</span>
                  </div>
                )}
              </div>
              <div
                className="flex gap-2 text-sm items-center"
                style={{ direction: "rtl" }}
              >
                <FaTruck className="text-[#5F6368]" />
                <span>زمان کاشت درخت 7 تا 10 روز کاری میباشد</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col gap-5">
              <div
                className="flex justify-center sm:justify-end items-center gap-1"
                style={{ direction: "rtl" }}
              >
                {treeData.tree?.price ? (
                  <>
                    <h2 className="text-2xl font-semibold flex items-center">
                      {formatNumberWithCommas(treeData.tree?.price)}
                    </h2>
                    <span className="text-[#28D16C] text-xs">تومان</span>
                  </>
                ) : (
                  <div className="w-full text-center text-red-600 font-semibold">
                    بدون قیمت
                  </div>
                )}
              </div>
              <div className="flex justify-center mb-5 sm:mb-0">
                <Button
                  disabled={!treeData.tree?.in_stock}
                  className="disabled:bg-slate-600"
                  variant={"green"}
                  size={"resizble"}
                >
                  افزودن به سبد خرید
                  <PlusCircleIcon className="ms-2" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="mt-auto">
                <div className="flex justify-center items-center gap-2">
                  <span className="text-[#797979]">امتیاز</span>
                  <span>
                    {treeData.avg?.toFixed(1) ||
                      treeData.tree?.avg?.toFixed(1) ||
                      0}
                  </span>
                  <FaStar className="text-[#F2B93B] mb-1" />
                </div>
              </div>
              <div className="mt-auto">
                <div className=" flex justify-center items-center gap-2">
                  <span className="text-[#797979]">کامنت</span>
                  <span>{treeData.commnet_count}</span>
                  <FaCommentAlt className="text-[#C0C0C0]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-2 grid-flow-row">
          <div className="flex justify-center">
            <div className="border-2 border-[#D2D2D2] p-1 rounded-lg w-full sm:w-[400px] h-[300px]">
              {treeData.tree?.image ? (
                <div className="relative w-full h-full ">
                  <Image
                    alt={`تصویر ${treeData.tree?.name}`}
                    fill
                    className="rounded-lg"
                    src={`https://treeone.liara.run/${treeData.tree?.image}`}
                  />
                </div>
              ) : (
                <div className="bg-slate-600 w-full rounded-lg h-full items-center justify-center flex">
                  <Frown className="text-white h-14 w-14" />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-evenly items-center">
            {treeData.images && treeData.images.length > 0
              ? treeData.images.map((image) => (
                  <div
                    className="relative w-[94px] h-[94px] rounded-lg border"
                    key={image.id}
                  >
                    {image ? (
                      <Image
                        fill
                        className="rounded-lg"
                        alt={`${treeData.tree?.name} تصویر ${image.id}`}
                        src={`https://treeone.liara.run/${image.image}`}
                      />
                    ) : (
                      <div className="bg-slate-600 w-full rounded-lg h-full items-center justify-center flex">
                        <Frown className="text-white" />
                      </div>
                    )}
                  </div>
                ))
              : Array(4)
                  .fill(0)
                  ?.map((image, index) => (
                    <div
                      className="relative col-span-1 w-full sm:w-[94px] h-[94px] rounded-lg border"
                      key={index}
                    >
                      {image ? (
                        <Image
                          alt={`${treeData.tree?.name} ${index} تصویر`}
                          src={""}
                        />
                      ) : (
                        <div className="bg-slate-600 w-full rounded-lg h-full items-center justify-center flex">
                          <Frown className="text-white" />
                        </div>
                      )}
                    </div>
                  ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TreeHeadInfo;
