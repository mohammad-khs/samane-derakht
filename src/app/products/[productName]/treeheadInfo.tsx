"use client";

import HeaderImages from "@/components/products/product/headerImages";
import { TreeData } from "@/types/products";
import { FC, useState } from "react";
import {
  FaFacebook,
  FaShareAlt,
  FaTelegram,
  FaTruck,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import Head from "next/head";
import { usePathname } from "next/navigation";

interface TreeHeadInfoProps {
  treeData: TreeData;
}

const TreeHeadInfo: FC<TreeHeadInfoProps> = ({ treeData }) => {
  const title = treeData.tree?.name || "عنوان پیش‌فرض";
  const description = treeData.tree?.name || "توضیحات پیش‌فرض برای این محصول."; // Update description to be based on actual data
  const imageUrl = treeData.tree?.image || "/default-image.jpg"; // مسیر پیش‌فرض در صورت نبود تصویر
  const pathname = usePathname() || "";
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>

      <section className="bg-white rounded-xl flex flex-col-reverse lg:flex-row justify-between p-5 mx-5 my-10">
        <div className="flex flex-col h-full m-5 justify-between">
          <div className="flex mt-5 lg:mt-0 mb-10 lg:mb-24">
            <div className="basis-1/4 m-2 relative">
              <div className="relative">
                <FaShareAlt
                  className="text-[#5F6368] w-5 h-5 cursor-pointer"
                  onClick={() => setShowOptions(!showOptions)}
                />
                {showOptions && (
                  <div className="absolute top-8 left-0 flex flex-col gap-2 bg-white shadow-lg rounded p-3 transition-all duration-300">
                    <FacebookShareButton url={shareUrl}>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <FaFacebook className="text-[#1877F2] w-5 h-5" />
                      </div>
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl}>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <FaTwitter className="text-[#1DA1F2] w-5 h-5" />
                      </div>
                    </TwitterShareButton>
                    <TelegramShareButton url={shareUrl}>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <FaTelegram className="text-[#0088cc] w-5 h-5" />
                      </div>
                    </TelegramShareButton>
                    <WhatsappShareButton url={shareUrl}>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <FaWhatsapp className="text-[#25D366] w-5 h-5" />
                      </div>
                    </WhatsappShareButton>
                  </div>
                )}
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
                استفاده از طراحان گرافیک است.
              </p>
              <div className="text-sm my-2" style={{ direction: "rtl" }}>
                {treeData.tree?.in_stock ? (
                  <div className="flex items-center gap-2">
                    <span className="bg-[#28D16C] rotate-45 rounded w-3 h-3 inline-block"></span>
                    وضعیت:
                    <span className="text-[#484848] text-xs">
                      موجود در انبار
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 rotate-45 rounded w-3 h-3 inline-block"></span>
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
                <span>زمان کاشت درخت 7 تا 10 روز کاری می‌باشد</span>
              </div>
            </div>
          </div>
        </div>
        <HeaderImages treeData={treeData} />
      </section>
    </>
  );
};

export default TreeHeadInfo;
