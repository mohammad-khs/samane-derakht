"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { FC, useEffect, useState } from "react";
import Transaction from "./transaction";

interface MyTransactionsProps {
  session: Session;
}

export interface TransactionType {
  id: number;
  amount: number;
  transaction_type: number;
  irani_time: string;
  created: string; // ISO timestamp format
}

interface ResponseData {
  balance: number;
  data: TransactionType[];
  offset: number;
}

type SortByOption = "create" | "-create" | "amount" | "-amount" | "default";
type TransactionSortType = "default" | number;
const MyTransactions: FC<MyTransactionsProps> = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ResponseData>();
  const [sortBy, setSortBy] = useState<SortByOption>("default");
  const [transactionSort, setTransactionSort] =
    useState<TransactionSortType>("default");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortByOption;
    setSortBy(value);
  };

  const fetchFinishedOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/mytransactions/`,
        {
          params: {
            tr_type: transactionSort !== "default" ? transactionSort : "",
            sort: sortBy,
          },
          headers: {
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );
      if (response.status === 200) {
        setData(response.data as ResponseData);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching Orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinishedOrders();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full justify-center items-center flex">
        <Loader2 className="animate-spin w-20 h-20 text-[#28D16C]" />
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl p-4 bg-white text-[#1F1F1F]">
        <div className="mb-8 flex gap-4">
          <div>
            <select
              id="sort-by"
              value={sortBy}
              onChange={handleSortChange}
              className="cursor-pointer px-1.5 text-sm py-1 border-2 border-[#A3A3A3] rounded"
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
          <div className="">
            <select
              value={transactionSort}
              onChange={(e) =>
                setTransactionSort(e.target.value as TransactionSortType)
              }
              className="flex items-center cursor-pointer px-1.5 text-sm py-1 border-2 border-[#A3A3A3] rounded"
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
          <Button
            onClick={fetchFinishedOrders}
            className="bg-[#F2B93B]"
            variant={"green"}
          >
            اعمال فیلتر
          </Button>
        </div>
        <table className="w-full">
          <thead className="text-center bg-[#EAEAEA] rounded-full">
            <tr className="">
              <th className="p-2  rounded-r-2xl">عنوان تراکنش</th>
              <th className="p-2 ">تاریخ</th>
              <th className="p-2 ">مقدار</th>
              <th className="p-2  rounded-l-2xl">موجودی</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((transaction) => {
              return (
                <Transaction
                  key={transaction.id}
                  transaction={transaction}
                  balance={data.balance}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyTransactions;
