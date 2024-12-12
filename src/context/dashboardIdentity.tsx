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
}

export const DashboardIdentityProvider: React.FC<
  DashboardIdentityProviderProps
> = ({ children }) => {
  const [userIdentity, setUserIdentity] = useState<UserIdentity>();

  
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
