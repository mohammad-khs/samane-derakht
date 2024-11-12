import { FC } from "react";
import ProgressBar from "../progressBar";

interface CityAndDistrictProps {}

const CityAndDistrict: FC<CityAndDistrictProps> = () => {
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-4/5 lg:w-3/5">
          <ProgressBar step="2" />
        </div>
      </div>
    </>
  );
};

export default CityAndDistrict;
