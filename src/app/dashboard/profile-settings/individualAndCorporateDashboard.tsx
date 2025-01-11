"use client";

import { FC, useEffect } from "react";
import CorporateDashboard from "./corporateDashboard";
import IndividualDashboard from "./individualDashboard";
import { useDashboardIdentityContext } from "@/context/dashboardIdentity";
import { Session } from "next-auth";
import { UserIdentity } from "./page";
import { Loader2 } from "lucide-react";
import axios from "axios";

interface IndividualAndCorporateDashboardProps {
  session: Session;
}

const IndividualAndCorporateDashboard: FC<
  IndividualAndCorporateDashboardProps
> = ({ session }) => {
  const { userIdentity, setUserIdentity } = useDashboardIdentityContext();

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/dashboard/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access}`,
              TOKEN: session.token,
            },
          }
        );

        setUserIdentity(response.data as UserIdentity);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Axios error:",
            error.response?.statusText || error.message
          );
        } else {
          console.error("Unexpected error:", error);
        }
        return null;
      }
    }
    fetchDashboardData();
  }, []);

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
