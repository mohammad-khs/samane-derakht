import IndividualAndCorporateDashboard from "./individualAndCorporateDashboard";
import { DashboardIdentityProvider } from "@/context/dashboardIdentity";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

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

  let userIdentity: UserIdentity | null = null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/dashboard/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access}`,
          TOKEN: session.token,
        },

        // cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    userIdentity = (await response.json()) as UserIdentity;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  }

  if (!userIdentity) {
    return Error;
  }

  return (
    <DashboardIdentityProvider serverUserIdentity={userIdentity}>
      <IndividualAndCorporateDashboard session={session} />
    </DashboardIdentityProvider>
  );
};

export default Dashboard;
