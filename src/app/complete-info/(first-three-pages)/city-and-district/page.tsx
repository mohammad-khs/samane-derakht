import { FC } from "react";
import ProgressBar from "../../progressBar";
import SelectAddress from "./selectAddress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

interface CityAndDistrictProps {}

const CityAndDistrict: FC<CityAndDistrictProps> = async () => {
  const session = await getServerSession(authOptions);

  if (session === null) {
    redirect("/");
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-4/5 lg:w-3/5">
          <ProgressBar step="2" />
        </div>
      </div>
      <SelectAddress session={session} />
    </>
  );
};

export default CityAndDistrict;
