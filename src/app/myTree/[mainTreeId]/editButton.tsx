"use client";

import { Button } from "@/components/ui/button";
import { FC } from "react";
import { MyMainTreeData } from "./page";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface EditButtonProps {
  data: MyMainTreeData;
}

const EditButton: FC<EditButtonProps> = ({ data }) => {
  const router = useRouter();
  const redirectToEdit = (canEdit: boolean) => {
    if (canEdit) {
      router.replace("/myTree/topic-edit");
    }
  };
  return (
    <>
      <Button
        size={"resizble"}
        onClick={() => redirectToEdit(data.can_edit)}
        disabled={!data.can_edit}
        className=" mb-3 sm:mb-0 mx-2 sm:mx-5"
        variant={"lightGray"}
      >
        <PencilIcon className="h-4 w-4 ml-3" /> ویرایش تاپیک
      </Button>
    </>
  );
};

export default EditButton;
