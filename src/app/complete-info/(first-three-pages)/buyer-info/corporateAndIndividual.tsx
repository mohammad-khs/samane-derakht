"use client";
import { FC, useState } from "react";
import CorporateCustomer from "./corporateCustomer";
import IndividualCustomer from "./individualCustomer";
import { useCompleteInfoContext } from "@/context/completeInfo";

interface CorporateAndIndividualProps {}

const CorporateAndIndividual: FC<CorporateAndIndividualProps> = () => {
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
