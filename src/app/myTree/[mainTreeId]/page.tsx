import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { TreeComment } from "@/types/products";
import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";
import ChatAndCommentMainTree from "./chatAndCommentMainTree";
import MainTreeHead from "./mainTreeHead";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import {
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "@/app/company/Icons";

interface MainTreeProps {
  params: { mainTreeId: string };
}

export interface MyMainTreeData {
  offset: number;
  can_edit: boolean;
  data: {
    id: string;
    user_username: string;
    irani_time: string;
    image: string;
    scan_numbers: number;
    time_joined: string;
    comment_numbers: number;
    images_list: [][];
    voice: string;
    video: string;
    description: string;
    longtitud: string;
    latitud: string;
    comments: TreeComment[];
    title: string | null;
  };
  saved: boolean;
}

const MainTree: FunctionComponent<MainTreeProps> = async ({
  params: { mainTreeId },
}) => {
  const session = await getServerSession(authOptions);
  let data: MyMainTreeData | null = null;

  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/mytree/${mainTreeId}/`,
      {
        headers: {
          Authorization: session?.access ? `Bearer ${session?.access}` : "",
          TOKEN: session?.token ?? "",
        },
      }
    );

    if (!resp.ok) {
      throw new Error(`Request failed with status ${resp.status}`);
    }

    data = await resp.json();
  } catch (error) {
    console.error("Error fetching main tree data:", error);
    return (
      <div className="p-4 text-red-600 text-center h-screen">
        خطا در بارگذاری داده‌ها. لطفاً دوباره تلاش کنید.
      </div>
    );
  }

  if (!data) {
    return <div className="p-4 text-center h-screen">در حال بارگذاری...</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center gap-3 text-[#1F1F1F] lg:flex-row-reverse">
        <div className="flex flex-col w-full gap-4 sm:flex-row lg:flex-col md:basis-3/12">
          <div className="w-full rounded-lg bg-white p-4 text-[#1F1F1F]">
            <h2 className="text-xl font-semibold mb-2">حمایت از کاربر</h2>
            <p className="text-sm">
              اگر این داستان رو دوست داشتی میتونی با هر مبلغی که خواستی ازش
              حمایت کنی تمام مبلغ وارد کیف پولش میشه و در وقت دلش خواست میتونه
              برداشت کنه
            </p>
            <Button className="flex gap-1 w-full mt-4" variant={"green"}>
              <CreditCard /> ارسال هدیه{" "}
            </Button>
          </div>
          <div className="w-full rounded-lg bg-white  p-4 text-[#1F1F1F]">
            <h2 className="text-xl font-semibold mb-2">شبکه های اجتماعی</h2>
            <div className="flex justify-evenly text-black mt-8">
              <a href="https://www.instagram.com/p/DIJyd4aPErn/?igsh=YWZtaWkycDhmcjFn">
                <InstagramIcon color="#5C5C5C" />
              </a>
              <TelegramIcon color="#5C5C5C" />
              <a href="https://wa.me/+989308880854">
                <WhatsappIcon color="#5C5C5C" />
              </a>
              <TwitterIcon color="#5C5C5C" />
            </div>
          </div>
        </div>

        <div className="w-full rounded-lg bg-white p-5 md:basis-9/12 md:p-10">
          <MainTreeHead session={session} data={data} />
        </div>
      </div>

      <ChatAndCommentMainTree
        data={data}
        session={session}
        mainTreeId={mainTreeId}
      />
    </>
  );
};

export default MainTree;
