import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import TreeOccasion from "./treeOccasion";
import { apiNameToIconName } from "@/helper/nameToIcon";
import { CaretDownIcon, DropdownMenuIcon } from "@radix-ui/react-icons";

interface ThemeSelectorProps {
  themes: TreeOccasion[];
}

const ThemeSelector: FC<ThemeSelectorProps> = ({ themes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const themeInput = useRef<HTMLDivElement>(null);
  const [currentTheme, setCurrentTheme] = useState<TreeOccasion>({
    id: "1",
    name: "عشق",
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (
      themeInput.current &&
      !themeInput.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleSelect = (theme: TreeOccasion) => {
    setCurrentTheme(theme); // Update the selected theme
    setIsOpen(false); // Close the dropdown
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={themeInput} className="relative w-full max-w-xs text-sm">
      <div
        ref={themeInput}
        id="tree-theme"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-3 py-2 border-2 border-[#A3A3A3] rounded cursor-pointer"
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Image
            src={`/svgs/storySvgs/${apiNameToIconName(
              currentTheme?.name || ""
            )}.svg`}
            width={20}
            height={20}
            alt={`${currentTheme?.name || "انتخاب تم"} تصویر`}
          />
          <span className="text-sm">{currentTheme?.name || "انتخاب تم"}</span>
        </div>
        <span>
          <CaretDownIcon />
        </span>
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border-2 border-[#A3A3A3] rounded shadow-md">
          {themes?.map((theme) => (
            <li
              key={theme.id}
              onClick={() => handleSelect(theme)}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              <div className="flex gap-3">
                <Image
                  src={`/svgs/storySvgs/${apiNameToIconName(theme.name)}.svg`}
                  width={20}
                  height={20}
                  alt={`${theme.name} تصویر`}
                />
                <span className="ml-2 text-sm">{theme.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeSelector;
