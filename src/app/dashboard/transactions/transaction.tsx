"use client";
import { DateFormatDMY } from "@/helper/dateHandler";
import {
  ArrowBottomLeftIcon,
  ArrowTopRightIcon,
  CaretLeftIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
import { FC } from "react";
import { TransactionType } from "./myTransactions";

interface TransactionProps {
  transaction: TransactionType;
  balance: number;
}

const Transaction: FC<TransactionProps> = ({ transaction, balance }) => {
  const giveTransactionName = (transactionNumber: number) => {
    switch (transactionNumber) {
      case 1:
        return "افزایش موجودی";
      case 2:
        return "خرید درخت";
      case 3:
        return "دریافت وجه";
      case 4:
        return "ارسال وجه";
      case 5:
        return "برداشت";
      default:
        "تراکنش نامشخص";
        break;
    }
  };

  const decideTransactionIcon = (transactionNumber: number) => {
    if (transactionNumber === 1 || transactionNumber === 3) {
      return (
        <>
          <ArrowBottomLeftIcon className="w-6 h-6 text-[#28D16C] bg-[#28D16C26] rounded-sm" />
        </>
      );
    }
    if (
      transactionNumber === 2 ||
      transactionNumber === 4 ||
      transactionNumber === 5
    ) {
      return (
        <>
          <ArrowTopRightIcon className="w-6 h-6 text-[#EA3636] bg-[#EA363626] rounded-sm" />
        </>
      );
    } else {
      return (
        <>
          <QuestionMarkIcon className="w-6 h-6 text-[#e5dd3d]" />
        </>
      );
    }
  };

  const dateInfo = DateFormatDMY(transaction.irani_time);
  return (
    <tr
      key={transaction.id}
      className="text-center relative border-b-2 border-[#F3F3F3]"
    >
      <td className="py-3 leading-8 flex justify-center items-center">
        {giveTransactionName(transaction.transaction_type)}

        <div className="absolute right-0">
          {decideTransactionIcon(transaction.transaction_type)}
        </div>
      </td>
      <td className="py-3 leading-8">
        {dateInfo && (
          <div>
            {dateInfo.day}/{dateInfo.month}/{dateInfo.year}
          </div>
        )}
      </td>
      <td className="py-3 leading-8">
        {transaction.amount}{" "}
        <span className="text-xs text-[#959595]">تومان</span>
      </td>
      <td className="py-3 leading-8">
        <div className="w-full">
          {balance} <span className="text-xs text-[#959595]">تومان</span>
        </div>
      </td>
    </tr>
  );
};

export default Transaction;
