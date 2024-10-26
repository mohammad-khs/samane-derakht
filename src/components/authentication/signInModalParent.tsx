"use client";

import { FC, useState } from "react";
import SignInModal from "./signInModal";
import { Button } from "../ui/button";

interface SignInModalParentProps {
  children: React.ReactNode;
}

const SignInModalParent: FC<SignInModalParentProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Button
        size={"resizble"}
        variant={"green"}
        onClick={() => setIsModalOpen(true)}
 
      >
        {children}
      </Button>
      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default SignInModalParent;
