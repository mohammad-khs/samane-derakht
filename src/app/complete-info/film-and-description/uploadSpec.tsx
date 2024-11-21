import { FC } from "react";
import DataLabel from "./dataLabel";
import TreeOccasion from "./treeOccasion";
import { Session } from "next-auth";

interface UploadSpecProps {
  session: Session;
}

const UploadSpec: FC<UploadSpecProps> = ({ session }) => {
  return (
    <>
      <div className="mx-4 sm:mx-24" dir="rtl">
        <TreeOccasion session={session} />
        <div className="border-b-2 border-[#A3A3A3] my-8"></div>
        <DataLabel />
        <br />
      </div>
    </>
  );
};

export default UploadSpec;
