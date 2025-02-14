import CommentAndChatSection from "@/app/products/[productName]/commentAndChatSection";
import { FC } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { MyMainTreeData } from "./page";
import { Session } from "next-auth";

interface ChatAndCommentMainTreeProps {
  mainTreeId: string;
  data: MyMainTreeData;
  session: Session | null;
}

const ChatAndCommentMainTree: FC<ChatAndCommentMainTreeProps> = ({
  mainTreeId,
  data,
  session,
}) => {
  return (
    <>
      <div className="bg-white p-5 md:p-10 rounded-xl w-full my-4" dir="ltr">
        <div className="flex justify-center items-center w-full">
          <div className="border-b-2 border-b-[#E1E1E1] w-full"></div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col w-full">
              <h2 className="sm:text-xl text-lg text-center font-semibold w-[110px] sm:w-[150px]">
                نظرات کاربران
              </h2>
              {/* <div className="flex justify-center items-center gap-2">
                <span className="text-[#797979]">امتیاز</span>
                <span>{data.data.?.toFixed(1) || 0}</span>
                <FaStar className="text-[#F2B93B] mb-1" />
              </div> */}
            </div>
            <div className="bg-[#28D16C26] flex justify-center items-center rounded-full p-2">
              <FaRegCommentAlt className="text-[#28D16C] w-5 h-5" />
            </div>
          </div>
        </div>
        <div>
          <CommentAndChatSection
            productId={mainTreeId}
            childCommentApi="/account/api/childcomment/"
            parentCommentApi="/account/api/mytreeComments/"
            inputCommentApi="/tree/api/"
            comments={data.data.comments}
            productSlug={data.data.id}
            session={session}
            isInTree={true}
          />
        </div>
      </div>
    </>
  );
};

export default ChatAndCommentMainTree;
