"use client";

import { FaUserCircle } from "react-icons/fa";
import { UserIdentity } from "@/types/dashboard";

interface UserProfileProps {
  user: UserIdentity | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const UserProfile = ({
  user,
  onImageChange,
  fileInputRef,
}: UserProfileProps) => (
  <div className="text-center mb-6">
    <div
      className="w-20 h-20 mx-auto rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
      onClick={() => fileInputRef.current?.click()}
    >
      {user?.image ? (
        <img
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.image}`}
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <FaUserCircle size={50} className="text-gray-600" />
      )}
    </div>
    <input
      type="file"
      accept="image/*"
      className="hidden"
      ref={fileInputRef}
      onChange={onImageChange}
    />
    <h2 className="text-lg font-bold mt-2">
      {user?.first_last_name || "کاربر"}
    </h2>
    <p className="text-sm text-gray-500">{user?.phone || "---"}</p>
  </div>
);
