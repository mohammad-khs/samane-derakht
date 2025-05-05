import { FC } from "react";
import { TreeComment } from "@/types/products";
import { FaRegCommentAlt, FaStar } from "react-icons/fa";
import CommentAndChatSection from "./commentAndChatSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface TreeMainInfoProps {
  comments?: TreeComment[];
  avg?: number | null;
  productId?: string;
  productSlug?: string;
  description: string | null | undefined;
}

const TreeMainInfo: FC<TreeMainInfoProps> = async ({
  productSlug,
  comments,
  avg,
  productId,
  description,
}) => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="bg-white m-5 p-5 md:p-10 rounded-xl">
        <div className="m-5" style={{ direction: "rtl" }}>
          <h1 className="text-2xl font-semibold mb-5">اطلاعات محصول</h1>
          <div className="text-[#373737] text-sm">
            {description ? (
              description
            ) : (
              <span className="text-red-500">
                توضیحی برای این محصول ثبت نشده است.
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="border-b-2 border-b-[#E1E1E1] w-full"></div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col w-full">
              <h2 className="sm:text-xl text-lg text-center font-semibold w-[110px] sm:w-[150px]">
                نظرات کاربران
              </h2>
              <div className="flex justify-center items-center gap-2">
                <span className="text-[#797979]">امتیاز</span>
                <span>{avg?.toFixed(1) || 0}</span>
                <FaStar className="text-[#F2B93B] mb-1" />
              </div>
            </div>
            <div className="bg-[#28D16C26] flex justify-center items-center rounded-full p-2">
              <FaRegCommentAlt className="text-[#28D16C] w-5 h-5" />
            </div>
          </div>
        </div>
        <div>
          <CommentAndChatSection
            productSlug={productSlug}
            session={session}
            comments={comments}
            productId={productId}
            childCommentApi="/order/api/child/"
            parentCommentApi="/order/api/treeComments/"
            inputCommentApi="/order/api/"
            isInTree={false}
          />
        </div>
      </div>
    </>
  );
};

export default TreeMainInfo;
