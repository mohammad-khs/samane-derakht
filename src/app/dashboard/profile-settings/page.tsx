import IndividualAndCorporateDashboard from "./individualAndCorporateDashboard";
import { DashboardIdentityProvider } from "@/context/dashboardIdentity";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { DateFormatDMY } from "@/helper/dateHandler";
import { fetcher } from "@/lib/utils";

export type UserIdentity = {
  username: string;
  phone: string;
  user_type: "HA" | "HO";
  zipcode: string;
  organization: string;
  email: string | null;
  birthday: string | null;
  bio: string | null;
  city: string | null;
  first_last_name: string | null;
  image: string | null;
};

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  let userIdentity = null;
  try {
    userIdentity = await fetcher(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/dashboard/`
    );
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  }

  if (!userIdentity) {
    return Error;
  }

  if (userIdentity.birthday) {
    const birthday = DateFormatDMY(userIdentity.birthday);
    console.log("birthday : ", birthday);
  }

  return (
    <DashboardIdentityProvider serverUserIdentity={userIdentity}>
      <IndividualAndCorporateDashboard session={session} />
    </DashboardIdentityProvider>
  );
};

export default Dashboard;
