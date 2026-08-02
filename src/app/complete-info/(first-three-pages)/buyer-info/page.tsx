import { FC } from "react";
import ProgressBar from "../../progressBar";
import CorporateAndIndividual from "./corporateAndIndividual";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import DecoyForSettingCustomer from "./decoyForSettingCustomer";
import { fetcher } from "@/lib/utils";


const CompleteInfo: FC = async () => {
  const session = await getServerSession(authOptions);
  if (session === null) {
    redirect("/");
  }
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/api/firstData/`,
  ) as {
    exists: boolean;
    user_type: "HA" | "HO";
  };

  if (data.exists && data.user_type) {
    return <DecoyForSettingCustomer fetchedCustomer={data.user_type} />;
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-4/5 lg:w-3/5">
          <ProgressBar step="1" />
        </div>
      </div>
      <CorporateAndIndividual />
    </>
  );
};

export default CompleteInfo;
