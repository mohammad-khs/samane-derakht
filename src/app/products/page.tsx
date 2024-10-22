import Image from "next/image";
import { FC } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import MobileNav from "@/components/mobile-nav";
import ProductsSection from "./productsSection";

interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  return (
    <>
      <div className="bg-[#EBEBEB]  ">
        <main className="md:container md:mx-auto pt-5 min-h-[65vh]">
          <Navbar />
          <MobileNav />
          <div className="flex justify-center flex-col md:pt-20 md:pb-10 pt-10 pb-5 items-center gap-5">
            <h1 className="relative flex justify-end items-center  text-2xl md:text-xl lg:text-2xl xl:text-3xl">
              <span className="mx-2 text-[#383838]">
                <h1>محصولات سامانه خرید درخت</h1>
              </span>
              <div className="absolute -right-10">
                <div className="relative">
                  <Image
                    src={"/svgs/verticalBranchWithLeaves.svg"}
                    width={0}
                    height={0}
                    style={{ width: "100%", height: "auto" }}
                    alt="vertical Branch With Leaves"
                  />
                </div>
              </div>
            </h1>
            <div>
              <p className="text-xs md:text-sm text-center px-5 text-[#373737]">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم
              </p>
            </div>
          </div>

          <ProductsSection />
        </main>
        <Footer sponsors={false} />
      </div>
    </>
  );
};

export default Products;
