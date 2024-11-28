"use client";

import {
  Authority,
  FileStatus,
  ProvinceMarker,
  TreeOccasionType,
} from "@/types/complete-info";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface CompleteInfoType {
  zipCode: string;
  setZipCode: Dispatch<SetStateAction<string>>;
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

  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  currentTheme: TreeOccasionType;
  setCurrentTheme: Dispatch<SetStateAction<TreeOccasionType>>;
  imageFiles: FileStatus[];
  setImageFiles: Dispatch<SetStateAction<FileStatus[]>>;
  videoFiles: FileStatus[];
  setVideoFiles: Dispatch<SetStateAction<FileStatus[]>>;
  audioFiles: FileStatus[];
  setAudioFiles: Dispatch<SetStateAction<FileStatus[]>>;

  authority: Authority | null;
  setAuthority: Dispatch<SetStateAction<Authority | null>>;

  method: "gateway" | "wallet";
  setMethod: Dispatch<SetStateAction<"gateway" | "wallet">>;
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
  const [zipCode, setZipCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [customer, setCustomer] = useState<"HA" | "HO">("HA");
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");

  // SecondData
  const [selectedMarkers, setSelectedMarkers] = useState<ProvinceMarker[]>([]);

  // thirdData
  const [currentTheme, setCurrentTheme] = useState<TreeOccasionType>({
    id: "1",
    name: "عشق",
  });
  const [imageFiles, setImageFiles] = useState<FileStatus[]>([]);
  const [videoFiles, setVideoFiles] = useState<FileStatus[]>([]);
  const [audioFiles, setAudioFiles] = useState<FileStatus[]>([]);
  const [description, setDescription] = useState("");
  const [authority, setAuthority] = useState<Authority | null>(null);

  // fourthPage
  const [method, setMethod] = useState<"gateway" | "wallet">("gateway");
  return (
    <CompleteInfoContext.Provider
      value={{
        zipCode,
        setZipCode,
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
        description,
        setDescription,
        imageFiles,
        setImageFiles,
        videoFiles,
        setVideoFiles,
        audioFiles,
        setAudioFiles,

        authority,
        setAuthority,
        method,
        setMethod,
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
