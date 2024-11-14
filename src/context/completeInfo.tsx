"use client"

import { createContext, useContext, useState, ReactNode } from "react";

interface CompleteInfoType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const CompleteInfoContext = createContext<CompleteInfoType | undefined>(
  undefined
);

interface CompleteInfoProviderProps {
  children: ReactNode;
}

export const CompleteInfoProvider: React.FC<CompleteInfoProviderProps> = ({
  children,
}) => {
  const [value, setValue] = useState<string>("");

  return (
    <CompleteInfoContext.Provider value={{ value, setValue }}>
      {children}
    </CompleteInfoContext.Provider>
  );
};

// Custom hook to use the CompleteInfoContext
export const useCompleteInfoContext = (): CompleteInfoType => {
  const context = useContext(CompleteInfoContext);
  if (!context) {
    throw new Error(
      "useCompleteInfoContext must be used within a CompleteInfoProvider"
    );
  }
  return context;
};
