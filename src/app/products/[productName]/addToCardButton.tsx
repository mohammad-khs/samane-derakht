"use client";
import SignInModal from "@/components/authentication/signInModal";
import { Button } from "@/components/ui/button";
import { TreeData } from "@/types/products";
import axios from "axios";
import { Loader2, PlusCircleIcon } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AddToCardButtonProps {
  session: Session | null;
  treeData: TreeData;
}

const AddToCardButton: FC<AddToCardButtonProps> = ({ treeData, session }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInCart, setIsInCart] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!treeData.tree?.slug) {
          setIsInCart(false);
          return;
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/api/checkInCart/${treeData.tree?.slug}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: session?.access ? `Bearer ${session.access}` : "",
              TOKEN: session?.token ?? "",
            },
          }
        );
        setIsInCart(response.data.in_cart);
      } catch  {
        toast.error(
          "مشکلی در دریافت محتویات سبد خرید پیش آمده لطفا صفحه را رفرش کنید"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [session, treeData]);

  const handleAddProduct = async () => {
    setIsLoading(true);
    try {
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

  // Show loading state until isInCart is either true or false
  if (isLoading || isInCart === null) {
    return (
      <Button className="bg-slate-600 hover:bg-slate-600 w-36" size="resizble">
        <Loader2 className="animate-spin w-8 h-8" />
      </Button>
    );
  }

  return (
    <>
      {isLoading === false && isInCart === true ? (
        <Link href="/shopping-cart">
          <Button
            disabled={isLoading || !treeData.tree?.in_stock}
            className="disabled:bg-slate-600 bg-orange-500 hover:bg-orange-600"
            variant="default"
            size="resizble"
          >
            در سبد خرید موجود میباشد
          </Button>
        </Link>
      ) : (
        <Button
          disabled={isLoading || !treeData.tree?.in_stock}
          className="disabled:bg-slate-600"
          variant="green"
          size="resizble"
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
