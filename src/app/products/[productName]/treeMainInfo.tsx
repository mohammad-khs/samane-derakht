import { FC } from "react";
import CommentSection from "../../../components/products/product/commentSection";
import { TreeComment } from "@/types/products";
import { FaComment, FaRegCommentAlt, FaStar } from "react-icons/fa";
import ChatInput from "@/components/ui/chatInput";
import CommentAndChatSection from "./commentAndChatSection";

interface TreeMainInfoProps {
  comments?: TreeComment[];
  avg?: number | null;

  productId: string;
}

const TreeMainInfo: FC<TreeMainInfoProps> = ({ comments, avg, productId }) => {
  return (
    <>
      <div className="bg-white m-5 p-5 md:p-10 rounded-xl">
        <div className="m-5" style={{ direction: "rtl" }}>
          <h1 className="text-2xl font-semibold mb-5">اطلاعات محصول</h1>
          <div className="text-[#373737] text-sm">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
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
          <CommentAndChatSection comments={comments} productId={productId} />
        </div>
      </div>
    </>
  );
};

export default TreeMainInfo;
