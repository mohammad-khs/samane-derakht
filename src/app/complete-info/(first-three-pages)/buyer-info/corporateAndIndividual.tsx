"use client";
import { FC } from "react";
import CorporateCustomer from "./corporateCustomer";
import IndividualCustomer from "./individualCustomer";
import { useCompleteInfoContext } from "@/context/completeInfo";

const CorporateAndIndividual: FC = () => {
  const { setCustomer, customer } = useCompleteInfoContext();
  return (
    <>
      {customer === "HA" ? (
        <IndividualCustomer setCustomer={setCustomer} />
      ) : (
        <CorporateCustomer setCustomer={setCustomer} />
      )}
    </>
  );
};

export default CorporateAndIndividual;
