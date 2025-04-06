"use client";
import { Check, X } from "lucide-react";
import { FC } from "react";
import toast, { Toaster } from "react-hot-toast";

const MyToaster: FC = () => {
  return (
    <Toaster
      toastOptions={{
        success: {
          icon: <Check />,
          style: {
            background: "#28D16C",
            color: "white",
          },
        },
        error: {
          icon: <X onClick={() => toast.dismiss()} />,
          style: {
            background: "#dc2626",
            color: "white",
          },
        },
      }}
      position="top-center"
    />
  );
};

export default MyToaster;
