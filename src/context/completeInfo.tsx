"use client";

import { ProvinceMarker } from "@/app/complete-info/city-and-district/page";
import { FileStatus } from "@/app/complete-info/film-and-description/imageUploader";
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
  imageFiles: FileStatus[];
  setImageFiles: Dispatch<SetStateAction<FileStatus[]>>;
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

  // SecondData
  const [selectedMarkers, setSelectedMarkers] = useState<ProvinceMarker[]>([]);

  // thirdData
  const [imageFiles, setImageFiles] = useState<FileStatus[]>([]);

  return (
    <CompleteInfoContext.Provider
      value={{
        value,
        setValue,
        selectedMarkers,
        setSelectedMarkers,
        imageFiles,
        setImageFiles,
      }}
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
