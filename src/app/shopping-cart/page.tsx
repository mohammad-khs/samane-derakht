"use client";
import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FC, useEffect } from "react";
import { FaTruck } from "react-icons/fa";
import LeftSideShoppingCart from "./leftSideShoppingCart";
import RightSideShoppingCart from "./rightSideShoppingCart";

interface ShoppingCartProps {}

const ShoppingCart: FC<ShoppingCartProps> = () => {
  const array = Array(4).fill("");
  return (
    <>
      <div className="bg-[#EBEBEB]">
        <div className="md:container md:mx-auto md:pt-5 min-h-[65vh]">
          <Navbar />
          <MobileNav />
          <main>
            <div className="flex flex-col justify-center sm:flex-row gap-3 text-[#1F1F1F] p-4">
              <div>
                <LeftSideShoppingCart />
              </div>
              <div>
                <div className="rounded-lg bg-white p-3">
                  {array.map((each, index) => (
                    <RightSideShoppingCart key={index} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer sponsors={false} />
      </div>
    </>
  );
};

export default ShoppingCart;
