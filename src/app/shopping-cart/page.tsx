"use client";
import { storeTokensInLocalStorage } from "@/components/authentication/signInModal";
import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import axios from "axios";
import { FC, useEffect } from "react";

interface ShoppingCartProps {}

const ShoppingCart: FC<ShoppingCartProps> = async () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const access = localStorage.getItem("access");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://treeone.liara.run/cart/api/cartcount/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access}`,
              TOKEN: token ?? "",
            },
            withCredentials: true, // Include cookies if needed
          }
        );
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="bg-[#EBEBEB]">
        <div className="md:container md:mx-auto md:pt-5 min-h-[65vh]">
          <Navbar />
          <MobileNav />

          <main></main>
        </div>
        <Footer sponsors={false} />
      </div>
    </>
  );
};

export default ShoppingCart;
