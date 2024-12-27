import IndividualAndCorporateDashboard from "./individualAndCorporateDashboard";
import { DashboardIdentityProvider } from "@/context/dashboardIdentity";
import { getServerSession, Session } from "next-auth";
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
};

async function fetchDashboardData(
  session: Session
): Promise<UserIdentity | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/dashboard/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access}`,
          TOKEN: session.token,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching dashboard data: ${response.statusText}`);
    }
    return (await response.json()) as UserIdentity;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
}

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const data = await fetchDashboardData(session);

  if (!data) {
    return (
      <div>
        <p className="text-red-500 text-lg">
          ارور در لود کردن داده‌ها. لطفا صفحه را رفرش کنید.
        </p>
      </div>
    );
  }

  return (
    <DashboardIdentityProvider>
      <IndividualAndCorporateDashboard data={data} session={session} />
    </DashboardIdentityProvider>
  );
};

export default Dashboard;
