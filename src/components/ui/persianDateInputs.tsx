"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import momentJalaali from "moment-jalaali";
import { FaChevronCircleDown, FaChevronDown } from "react-icons/fa";
import { ChevronDownIcon } from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";

// Get the Persian months
const getPersianMonths = () => [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

// Generate Persian days for a specific month
const getPersianDays = (year: number, month: number) => {
  const momentDate = momentJalaali({ y: year, m: month, d: 1 });
  return Array.from({ length: momentDate.daysInMonth() }, (_, i) => i + 1);
};

// Get Persian years
const getPersianYears = () => {
  const currentYear = momentJalaali().jYear();
  return Array.from({ length: 100 }, (_, i) => currentYear - i);
};

const PersianDatePicker: React.FC = () => {
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);

  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);

  const months = getPersianMonths();
  const years = getPersianYears();

  // Memoize days to update only when year or month changes
  const days = useMemo(() => {
    if (year && month !== null) {
      return getPersianDays(year, month);
    }
    // Default to a list of days (1–31) if year or month is not selected
    return Array.from({ length: 31 }, (_, i) => i + 1);
  }, [year, month]);

  const yearRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      yearRef.current &&
      !yearRef.current.contains(event.target as Node) &&
      isYearDropdownOpen
    ) {
      setIsYearDropdownOpen(false);
    }
    if (
      monthRef.current &&
      !monthRef.current.contains(event.target as Node) &&
      isMonthDropdownOpen
    ) {
      setIsMonthDropdownOpen(false);
    }
    if (
      dayRef.current &&
      !dayRef.current.contains(event.target as Node) &&
      isDayDropdownOpen
    ) {
      setIsDayDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isYearDropdownOpen, isMonthDropdownOpen, isDayDropdownOpen]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (
      value <= momentJalaali().jYear() &&
      value >= momentJalaali().jYear() - 100
    ) {
      setYear(value);
    } else {
      setYear(null); // Reset to null if invalid year
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 12) {
      setMonth(value - 1); // Adjust for zero-based index
    } else {
      setMonth(null); // Reset to null if invalid month
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= (days.length > 0 ? days[days.length - 1] : 31)) {
      setDay(value);
    } else {
      setDay(null); // Reset to null if invalid day
    }
  };

  return (
    <div className="flex gap-3">
      {/* Day Input with Dropdown */}
      <div ref={dayRef} className="flex flex-col relative">
        <div
          className="flex items-center cursor-pointer px-1.5 py-1 border-2 border-[#A3A3A3] rounded"
          onClick={() => setIsDayDropdownOpen(!isDayDropdownOpen)}
        >
          <input
            id="birthday"
            type="number"
            value={day ?? ""}
            min={1}
            max={31}
            onChange={handleDayChange}
            placeholder="روز"
            className="w-full bg-transparent outline-none text-sm"
          />
          <TriangleDownIcon className="ms-2 w-4 h-4" />
        </div>
        {isDayDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10 text-sm">
            <ul className="max-h-48 overflow-y-auto">
              {days.map((d) => (
                <li
                  key={d}
                  className="cursor-pointer hover:bg-gray-200 p-2"
                  onClick={() => {
                    setDay(d);
                    setIsDayDropdownOpen(false);
                  }}
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Month Input with Dropdown */}
      <div ref={monthRef} className="flex flex-col relative">
        <div
          className="flex w-24 items-center cursor-pointer px-1.5 py-1 border-2 border-[#A3A3A3] rounded"
          onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
        >
          <input
            id="birthMonth"
            type="number"
            value={month !== null ? month + 1 : ""}
            min={1}
            max={12}
            onChange={handleMonthChange}
            placeholder="ماه"
            className="w-full bg-transparent outline-none text-sm"
          />
          <TriangleDownIcon className="ms-2 w-4 h-4" />
        </div>
        {isMonthDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10 text-sm">
            <ul className="max-h-48 w-full overflow-y-auto">
              {months.map((m, index) => (
                <li
                  key={index}
                  className="cursor-pointer w-full hover:bg-gray-200 p-2"
                  onClick={() => {
                    setMonth(index);
                    setIsMonthDropdownOpen(false);
                  }}
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Year Input with Dropdown */}
      <div ref={yearRef} className="flex flex-col relative">
        <div
          className="flex items-center cursor-pointer px-1.5 py-1 border-2 border-[#A3A3A3] rounded"
          onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
        >
          <input
            id="birthYear"
            type="number"
            value={year ?? ""}
            min={momentJalaali().jYear() - 100}
            max={momentJalaali().jYear()}
            onChange={handleYearChange}
            placeholder="سال"
            className="w-full bg-transparent outline-none text-sm"
          />
          <TriangleDownIcon className="ms-2 w-4 h-4" />
        </div>
        {isYearDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10 text-sm">
            <ul className="max-h-48 overflow-y-auto">
              {years.map((y) => (
                <li
                  key={y}
                  className="cursor-pointer hover:bg-gray-200 p-2"
                  onClick={() => {
                    setYear(y);
                    setIsYearDropdownOpen(false);
                  }}
                >
                  {y}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersianDatePicker;
