export interface UserIdentity {
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
  }
  
  export type NavLink = {
    icon: React.ReactNode;
    label: string;
    href: string;
  };
  
  export type MobileNavLink = {
    icon: React.ReactNode;
    href: string;
  };