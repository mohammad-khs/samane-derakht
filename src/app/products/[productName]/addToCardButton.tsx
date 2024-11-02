"use client";
import SignInModal from "@/components/authentication/signInModal";
import { Button } from "@/components/ui/button";
import { TreeData } from "@/types/products";
import axios from "axios";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface AddToCardButtonProps {
  treeData: TreeData;
}

const AddToCardButton: FC<AddToCardButtonProps> = ({ treeData }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddProduct = async () => {
    try {
      setIsLoading(true);
      const access = localStorage.getItem("access");
      const token = localStorage.getItem("token");
      await axios.post(
        `https://treeone.liara.run/cart/api/add/${treeData.tree?.id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access}`,
            TOKEN: token,
          },
        }
      );
      toast.success("کالای شما با موفقیت ثبت شد");
      router.push("/shopping-cart");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("لطفا احراز هویت فرمایید");
        setIsModalOpen(true);
      } else {
        toast.error("مشکلی پیش آمد. لطفاً بعداً دوباره تلاش کنید");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button
        disabled={isLoading || !treeData.tree?.in_stock}
        className="disabled:bg-slate-600"
        variant={"green"}
        size={"resizble"}
        onClick={handleAddProduct}
      >
        افزودن به سبد خرید
        <PlusCircleIcon className="ms-2" />
      </Button>

      {isModalOpen && (
        <SignInModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default AddToCardButton;
