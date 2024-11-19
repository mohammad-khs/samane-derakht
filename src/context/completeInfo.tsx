"use client"

import { ProvinceMarker } from "@/app/complete-info/city-and-district/page";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface CompleteInfoType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  selectedMarkers: ProvinceMarker[];
  setSelectedMarkers: Dispatch<SetStateAction<ProvinceMarker[]>>;
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
  // firstData
  const [value, setValue] = useState<string>("");

  // firstSecondData
  const [selectedMarkers, setSelectedMarkers] = useState<ProvinceMarker[]>([]);

  return (
    <CompleteInfoContext.Provider
      value={{ value, setValue, selectedMarkers, setSelectedMarkers }}
    >
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
