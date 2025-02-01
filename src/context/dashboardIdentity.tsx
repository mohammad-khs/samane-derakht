"use client";

import { UserIdentity } from "@/app/dashboard/profile-settings/page";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface DashboardIdentityType {
  userIdentity: UserIdentity | undefined;
  setUserIdentity: Dispatch<SetStateAction<UserIdentity | undefined>>;
}

const DashboardIdentityContext = createContext<
  DashboardIdentityType | undefined
>(undefined);

interface DashboardIdentityProviderProps {
  children: ReactNode;
  serverUserIdentity?: UserIdentity; // Add this prop
}

export const DashboardIdentityProvider: React.FC<
  DashboardIdentityProviderProps
> = ({ children, serverUserIdentity }) => { // Destructure the new prop
  const [userIdentity, setUserIdentity] = useState<UserIdentity | undefined>(serverUserIdentity); // Initialize with server data

  return (
    <DashboardIdentityContext.Provider
      value={{
        userIdentity,
        setUserIdentity,
      }}
    >
      {children}
    </DashboardIdentityContext.Provider>
  );
};

// Custom hook to use the DashboardIdentityContext
export const useDashboardIdentityContext = (): DashboardIdentityType => {
  const context = useContext(DashboardIdentityContext);
  if (!context) {
    throw new Error(
      "DashboardIdentityContext must be used within a DashboardIdentityProvider"
    );
  }
  return context;
};
