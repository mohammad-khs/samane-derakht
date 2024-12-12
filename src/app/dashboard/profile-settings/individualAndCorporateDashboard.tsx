"use client";

import { FC, useEffect } from "react";
import CorporateDashboard from "./corporateDashboard";
import IndividualDashboard from "./individualDashboard";
import { useDashboardIdentityContext } from "@/context/dashboardIdentity";
import { Session } from "next-auth";
import { UserIdentity } from "./page";
import { Loader2 } from "lucide-react";

interface IndividualAndCorporateDashboardProps {
  session: Session;
  data: UserIdentity;
}

const IndividualAndCorporateDashboard: FC<
  IndividualAndCorporateDashboardProps
> = ({ session, data }) => {
  const { userIdentity, setUserIdentity } = useDashboardIdentityContext();

  useEffect(() => {
    setUserIdentity(data);
  }, [data, setUserIdentity]);

  if (!userIdentity) {
    return (
      <div className="w-full h-full justify-center items-center flex">
        <Loader2 className="animate-spin w-20 h-20 text-[#28D16C]" />
      </div>
    );
  }

  return (
    <div>
      {userIdentity?.user_type === "HO" ? (
        <CorporateDashboard session={session} />
      ) : (
        <IndividualDashboard session={session} />
      )}
    </div>
  );
};

export default IndividualAndCorporateDashboard;
