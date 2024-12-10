"use client";
import { useCompleteInfoContext } from "@/context/completeInfo";
import { redirect } from "next/navigation";
import { FC } from "react";

interface DecoyForSettingCustomerProps {
  fetchedCustomer: "HA" | "HO";
}

const DecoyForSettingCustomer: FC<DecoyForSettingCustomerProps> = ({
  fetchedCustomer,
}) => {
  console.log(fetchedCustomer);
  const { setCustomer, customer } = useCompleteInfoContext();
  setCustomer(fetchedCustomer);
  console.log(customer);
  redirect("city-and-district");
};

export default DecoyForSettingCustomer;
