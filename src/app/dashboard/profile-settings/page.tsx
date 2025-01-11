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



const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }



  return (
    <DashboardIdentityProvider>
      <IndividualAndCorporateDashboard session={session} />
    </DashboardIdentityProvider>
  );
};

export default Dashboard;
