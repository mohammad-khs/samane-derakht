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
};

async function fetchDashboard(session: Session): Promise<UserIdentity | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/dashboard/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access}`,
          TOKEN: session.token,
        },
        cache: "no-store", // Ensure no caching
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }
    return (await res.json()) as UserIdentity;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const data = await fetchDashboard(session);
  console.log(data);

  if (!data) {
    return <p>Error loading data. Please try again.</p>;
  }

  return (
    <DashboardIdentityProvider>
      <IndividualAndCorporateDashboard data={data} session={session} />
    </DashboardIdentityProvider>
  );
};

export default Dashboard;
