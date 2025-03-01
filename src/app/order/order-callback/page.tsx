"use client";

import { useEffect, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

// Main component content wrapped in Suspense
const OrderCallBackContent = () => {
  const router = useRouter();
  const search = useSearchParams();
  const or_id = search?.get("order_id");
  const tr_id = search?.get("tr_id");
  const token = search?.get("token");

  useEffect(() => {
    if ((or_id || tr_id) && token) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${
            or_id ? "order/api/orderCallBack" : "account/api/callback"
          }/${or_id || tr_id}/${token}`
        )
        .then((res) => {
          const data = res.data;
          if (data.confirmed) {
            router.push("/order/transaction-state/success");
          } else {
            const errorMsg = translateMessage(data.msg);
            toast.error(errorMsg);
            router.push("/order/transaction-state/failed");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(
            "مشکلی در ارتباط با سرور پیش آمد. لطفاً دوباره تلاس کنید."
          );
          router.push("/order/transaction-state/failed");
        });
    }
  }, [or_id, tr_id, token, router]);

  return <div className="my-10 text-center text-[#21ad58]">در حال پردازش سفارش...</div>;
};

// Wrapper component that adds Suspense boundary
const OrderCallBackPage = () => {
  return (
    <Suspense fallback={<div className="my-10 text-center text-[#21ad58]">در حال پردازش سفارش...</div>}>
      <OrderCallBackContent />
    </Suspense>
  );
};

const translateMessage = (msg: string): string => {
  switch (msg) {
    case "connect to gateway":
      return "اتصال به درگاه برقرار نشد. لطفاً فیلترشکن (VPN) خود را خاموش کنید و دوباره تلاس کنید.";
    case "timeout":
      return "زمان اتصال به درگاه به اتمام رسید. لطفاً اتصال اینترنت خود را بررسی کنید.";
    case "connection error":
      return "خطا در برقراری ارتباط. لطفاً اتصال اینترنت خود را چک کنید.";
    default:
      return msg;
  }
};

export default OrderCallBackPage;