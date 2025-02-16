"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { FC, useState } from "react";
import Transaction from "./transaction";
import useSWRInfinite from "swr/infinite";

interface MyTransactionsProps {
  session: Session;
}

export interface TransactionType {
  id: number;
  amount: number;
  transaction_type: number;
  irani_time: string;
  created: string;
}

interface ResponseData {
  balance: number;
  data: TransactionType[];
  offset: number;
}

type SortByOption = "create" | "-create" | "amount" | "-amount" | "default";
type TransactionSortType = "default" | number;

export const fetcher = (url: string, session: Session) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${session?.access}`,
        TOKEN: session?.token,
      },
    })
    .then((res) => res.data);

export function useFinishedOrders(
  session: Session,
  transactionSort: TransactionSortType,
  sortBy: string
) {
  const getKey = (pageIndex: number, previousPageData: unknown[]) => {
    if (pageIndex === 0 && !previousPageData) {
      return `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/account/api/mytransactions/?tr_type=${
        transactionSort !== "default" ? transactionSort : ""
      }&sort=${sortBy}&offset=0`;
    }

    if (previousPageData && previousPageData.length === 0) return null;

    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/account/api/mytransactions/?tr_type=${
      transactionSort !== "default" ? transactionSort : ""
    }&sort=${sortBy}&offset=${pageIndex * 5}`;
  };

  const { data, error, size, setSize, mutate } = useSWRInfinite(
    getKey,
    (url) => fetcher(url, session),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const orders = data ? data.flat() : [];
  const isLoading = !data && !error;
  const currentData: ResponseData = data ? data[size - 1] : [];
  const previousData: ResponseData = data ? data[size - 2] : [];

  return {
    orders,
    error,
    isLoading,
    currentData,
    previousData,
    size,
    setSize,
    mutate,
  };
}

const MyTransactions: FC<MyTransactionsProps> = ({ session }) => {
  const [sortBy, setSortBy] = useState<SortByOption>("default");
  const [transactionSort, setTransactionSort] =
    useState<TransactionSortType>("default");
  const [pendingSortBy, setPendingSortBy] = useState<SortByOption>("default");
  const [pendingTransactionSort, setPendingTransactionSort] =
    useState<TransactionSortType>("default");

  const {
    orders,
    isLoading,
    currentData,
    previousData,
    setSize,
    error,
    mutate,
  } = useFinishedOrders(session, transactionSort, sortBy);

  const handleFilterApply = () => {
    setSortBy(pendingSortBy);
    setTransactionSort(pendingTransactionSort);
    mutate();
  };

  if (isLoading) {
    return (
      <div className="w-full h-full justify-center items-center flex">
        <Loader2 className="animate-spin w-20 h-20 text-[#28D16C]" />
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl p-4 text-xs sm:text-base bg-white text-[#1F1F1F]">
        <div className="mb-8 flex flex-col sm:flex-row gap-2 md:gap-4 ">
          <div>
            <select
              id="sort-by"
              value={pendingSortBy}
              onChange={(e) => setPendingSortBy(e.target.value as SortByOption)}
              className="cursor-pointer px-1.5 py-1 border-2 border-[#A3A3A3] rounded text-xs sm:text-base"
            >
              <option value="default" disabled>
                مرتب‌سازی بر اساس
              </option>
              <option value="-amount">بیشترین مقدار</option>
              <option value="amount">کمترین مقدار</option>
              <option value="-create">جدیدترین</option>
              <option value="create">قدیمی‌ترین</option>
            </select>
          </div>
          <div>
            <select
              value={pendingTransactionSort}
              onChange={(e) =>
                setPendingTransactionSort(e.target.value as TransactionSortType)
              }
              className="cursor-pointer px-1.5 py-1 border-2 border-[#A3A3A3] rounded text-xs sm:text-base"
            >
              <option value="default" disabled>
                نوع تراکنش
              </option>
              <option value="1">افزایش موجودی</option>
              <option value="2">خرید درخت</option>
              <option value="3">دریافت وجه</option>
              <option value="4">ارسال وجه</option>
              <option value="5">برداشت</option>
            </select>
          </div>
          <div className="items-center flex">
            <Button
              onClick={handleFilterApply}
              className="bg-[#F2B93B]"
              variant={"green"}
            >
              اعمال فیلتر
            </Button>
          </div>
        </div>
        <table className="w-full">
          <thead className="text-center bg-[#EAEAEA] rounded-full">
            <tr>
              <th className="p-2  rounded-r-2xl">عنوان تراکنش</th>
              <th className="p-2">تاریخ</th>
              <th className="p-2 rounded-l-2xl">مقدار</th>
            </tr>
          </thead>
          <tbody>
            {orders[orders.length - 1]?.data?.map(
              (transaction: TransactionType) => (
                <Transaction key={transaction.id} transaction={transaction} />
              )
            )}
          </tbody>
        </table>
      </div>

      {error && error?.status === 429 ? (
        <div className="text-red-600 text-center my-3">
          لطفا کمی صبر کنید...
        </div>
      ) : (
        <div className="text-red-600 text-center my-3">{error?.message}</div>
      )}
      <div
        className={`text-center mt-8 ${
          !currentData?.data ||
          currentData?.data?.length === previousData?.data?.length ||
          currentData?.data?.length < 10
            ? "hidden"
            : ""
        }`}
      >
        {
          <Button
            disabled={
              !currentData?.data ||
              currentData?.data?.length === previousData?.data?.length ||
              currentData?.data?.length < 10
            }
            className="disabled:bg-slate-500"
            variant={"green"}
            onClick={() => setSize((prev) => prev + 1)}
          >
            نمایش بیشتر
          </Button>
        }
      </div>
    </>
  );
};

export default MyTransactions;
