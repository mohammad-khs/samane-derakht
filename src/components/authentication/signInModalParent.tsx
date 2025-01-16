"use client";

import { FC, useState } from "react";
import SignInModal from "./signInModal";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { UserCircle } from "lucide-react";
import Link from "next/link";

interface SignInModalParentProps {
  children: React.ReactNode;
}

const SignInModalParent: FC<SignInModalParentProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();
  return (
    <div>
      {status === "unauthenticated" ? (
        <>
          <Button
            size={"resizble"}
            variant={"green"}
            onClick={() => setIsModalOpen(true)}
          >
            {children}
          </Button>
          <SignInModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      ) : (
        <Link href={"/dashboard/profile-settings"}>
          <Button className="flex justify-center items-center" size={"icon"} variant={"green"}>
            <UserCircle />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default SignInModalParent;
