"use client"
import { FC, useState } from "react";
import { Button } from "../ui/button";

interface TermsAndConditionsProps {}

const TermsAndConditions: FC<TermsAndConditionsProps> = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <>
      <div className="text-xs mb-5" style={{ direction: "rtl" }}>
        ورود شما به منزله پذیرش{" "}
        <button
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => setShowTermsModal(true)}
        >
          قوانین
        </button>{" "}
        و{" "}
        <button
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => setShowPrivacyModal(true)}
        >
          حریم خصوصی
        </button>{" "}
        می‌باشد.
      </div>
      {showTermsModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]"
          onClick={(e) => {
            e.stopPropagation();
            if ((e.target as HTMLDivElement).className.includes("fixed")) {
              setShowTermsModal(false);
            }
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="font-semibold mb-4 text-lg">قوانین</h3>
            <p className="text-sm" style={{ direction: "rtl" }}>
              {loremIpsum}
            </p>
            <Button
              className="mt-4 w-full"
              variant="green"
              onClick={() => setShowTermsModal(false)}
            >
              بستن
            </Button>
          </div>
        </div>
      )}
      {showPrivacyModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]"
          onClick={(e) => {
            e.stopPropagation();
            if ((e.target as HTMLDivElement).className.includes("fixed")) {
              setShowPrivacyModal(false);
            }
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="font-semibold mb-4 text-lg">حریم خصوصی</h3>
            <p className="text-sm" style={{ direction: "rtl" }}>
              {loremIpsum}
            </p>
            <Button
              className="mt-4 w-full"
              variant="green"
              onClick={() => setShowPrivacyModal(false)}
            >
              بستن
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsAndConditions;
