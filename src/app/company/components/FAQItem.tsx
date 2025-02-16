"use client";

import { FC, useState } from "react";
import { MinusIcon, PlusIcon } from "../Icons";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="text-black text-sm">
      <div
        className={`border-2 rounded-lg mb-4 py-2 md:py-3 px-2 md:px-6 transition-all duration-300 cursor-pointer ${
          isOpen ? "bg-[#21AD58] text-white border-[#21AD58]" : "bg-white"
        }`}
        onClick={toggleOpen}
      >
        <button className="w-full h-full flex justify-between items-center text-sm md:text-lg focus:outline-none">
          {question}
          <span>{isOpen ? <MinusIcon /> : <PlusIcon />}</span>
        </button>
      </div>
      {isOpen && <p className="mb-8 px-6">{answer}</p>}
    </section>
  );
};

export default FAQItem;
