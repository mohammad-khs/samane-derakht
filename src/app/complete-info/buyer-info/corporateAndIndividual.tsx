"use client";
import { FC, useState } from "react";
import CorporateCustomer from "./corporateCustomer";
import IndividualCustomer from "./individualCustomer";

interface CorporateAndIndividualProps {}

const CorporateAndIndividual: FC<CorporateAndIndividualProps> = () => {
  const [isIndividual, setIsIndividual] = useState(true);
  return (
    <>
      {isIndividual ? (
        <IndividualCustomer setIsIndividual={setIsIndividual} />
      ) : (
        <CorporateCustomer setIsIndividual={setIsIndividual} />
      )}
    </>
  );
};

export default CorporateAndIndividual;
