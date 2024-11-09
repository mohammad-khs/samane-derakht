"use client";

import { FC, useState } from "react";
import SignInModal from "./signInModal";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { UserCircle } from "lucide-react";

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
        <Button size={"icon"} variant={"green"}>
          <UserCircle />
        </Button>
      )}
    </div>
  );
};

export default SignInModalParent;
