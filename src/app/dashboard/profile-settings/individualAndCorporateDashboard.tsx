"use client";

import { FC } from "react";
import CorporateDashboard from "./corporateDashboard";
import IndividualDashboard from "./individualDashboard";
import { useDashboardIdentityContext } from "@/context/dashboardIdentity";
import { Session } from "next-auth";
import { Loader2 } from "lucide-react";

interface IndividualAndCorporateDashboardProps {
  session: Session;
}

const IndividualAndCorporateDashboard: FC<
  IndividualAndCorporateDashboardProps
> = ({ session }) => {
  const { userIdentity } = useDashboardIdentityContext();

  if (!userIdentity) {
    return (
      <div className="w-full h-full justify-center items-center flex">
        <Loader2 className="animate-spin w-20 h-20 text-[#28D16C]" />
      </div>
    );
  }

  return (
    <div>
      {userIdentity.user_type === "HO" ? (
        <CorporateDashboard session={session} />
      ) : (
        <IndividualDashboard session={session} />
      )}
    </div>
  );
};

export default IndividualAndCorporateDashboard;