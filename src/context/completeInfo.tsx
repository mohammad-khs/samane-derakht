"use client";

import { ProvinceMarker } from "@/app/complete-info/city-and-district/page";
import { FileStatus } from "@/app/complete-info/film-and-description/imageUploader";
import TreeOccasion from "@/app/complete-info/film-and-description/treeOccasion";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface CompleteInfoType {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  customer: "HA" | "HO";
  setCustomer: Dispatch<SetStateAction<"HA" | "HO">>;
  provinceId: string;
  setProvinceId: Dispatch<SetStateAction<string>>;
  cityId: string;
  setCityId: Dispatch<SetStateAction<string>>;
  selectedMarkers: ProvinceMarker[];
  setSelectedMarkers: Dispatch<SetStateAction<ProvinceMarker[]>>;
  currentTheme: TreeOccasion;
  setCurrentTheme: Dispatch<SetStateAction<TreeOccasion>>;
  imageFiles: FileStatus[];
  setImageFiles: Dispatch<SetStateAction<FileStatus[]>>;
  videoFiles: FileStatus[];
  setVideoFiles: Dispatch<SetStateAction<FileStatus[]>>;
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [customer, setCustomer] = useState<"HA" | "HO">("HA");
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");

  // SecondData
  const [selectedMarkers, setSelectedMarkers] = useState<ProvinceMarker[]>([]);

  // thirdData
  const [currentTheme, setCurrentTheme] = useState<TreeOccasion>({
    id: "1",
    name: "عشق",
  });
  const [imageFiles, setImageFiles] = useState<FileStatus[]>([]);
  const [videoFiles, setVideoFiles] = useState<FileStatus[]>([]);

  return (
    <CompleteInfoContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        customer,
        setCustomer,

        cityId,
        setCityId,
        provinceId,
        setProvinceId,
        selectedMarkers,
        setSelectedMarkers,

        currentTheme,
        setCurrentTheme,
        imageFiles,
        setImageFiles,
        videoFiles,
        setVideoFiles,
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
