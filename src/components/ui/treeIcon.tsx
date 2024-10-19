import { apiNameToIconName } from "@/helper/nameToIcon";
import Image from "next/image";
import { FC } from "react";

interface TreeIconProps {
  imageName: string;
}

const TreeIcon: FC<TreeIconProps> = ({ imageName }) => {
  return (
    <>
      <Image
        className="p-[10px]"
        src={`svgs/storySvgs/${apiNameToIconName(imageName)}.svg`}
        fill
        alt={`${imageName} icon`}
      />
    </>
  );
};

export default TreeIcon;
