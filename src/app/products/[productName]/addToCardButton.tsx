"use client";
import SignInModal from "@/components/authentication/signInModal";
import { Button } from "@/components/ui/button";
import { TreeData } from "@/types/products";
import axios from "axios";
import { PlusCircleIcon } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface AddToCardButtonProps {
  session: Session | null;
  treeData: TreeData;
}

const AddToCardButton: FC<AddToCardButtonProps> = ({ treeData, session }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddProduct = async () => {
    try {
      setIsLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/api/add/${treeData.tree?.id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );
      toast.success("کالای شما با موفقیت ثبت شد");
      router.push("/shopping-cart");
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.data[0] === "Token is required"
      ) {
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
      {treeData.in_cart ? (
        <Link href={"/shopping-cart"}>
          <Button
            disabled={isLoading || !treeData.tree?.in_stock}
            className="disabled:bg-slate-600 bg-orange-500"
            variant={"default"}
            size={"resizble"}
          >
            در سبد خرید موجود میباشد
          </Button>
        </Link>
      ) : (
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
      )}

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
