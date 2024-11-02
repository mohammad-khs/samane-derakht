import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import { TreeData } from "@/types/products";
import { FC } from "react";
import TreeHeadInfo from "./treeheadInfo";
import Footer from "@/components/footer";
import MainCarousel from "@/components/main/mainCarousel";
import TreeMainInfo from "./treeMainInfo";
import NotFound from "./not-found";

interface ProductProps {
  params: {
    productName: string;
  };
}

const Product: FC<ProductProps> = async ({ params }) => {
  // const decodedProductName = decodeURIComponent(
  //   params.productName.replace(/-/g, " ")
  // );

  // const allProductsRes = await fetch(
  //   `https://treeone.liara.run/order/api/trees/?offset=100`
  // );
  // const products = await allProductsRes.json();

  // const product = products?.data.find((p: { name: string }) => {
  //   return p.name === decodedProductName;
  // });

  // if (!product) {
  //   return (
  //     <div className="text-green-500 py-5 text-center text-xl">
  //       <NotFound />
  //     </div>
  //   );
  // }
  const res = await fetch(
    `https://treeone.liara.run/order/api/tree/${params.productName}`
  );

  const data = await res.json();
  const treeData: TreeData = {
    tree: data[0]?.tree,
    images: data[1]?.images,
    comments: data[2]?.comments,
    related: data[3]?.related,
    commnet_count: data[4]?.commnet_count,
    avg: data[5]?.avg,
    comment_offset: data[6]?.comment_offset,
  };

  return (
    <>
      <div className="bg-[#EBEBEB]">
        <div className="md:container md:mx-auto md:pt-5 min-h-[65vh]">
          <Navbar />
          <MobileNav />
          <TreeHeadInfo treeData={treeData} />
          <main>
            <TreeMainInfo
              avg={treeData?.avg}
              productId={params.productName}
              // productId={product.id}
              comments={treeData.comments}
            />
            <div className="mb-8">
              <MainCarousel
                background="bg-white"
                hasPrevNextBtn={true}
                data={treeData.related}
              />
            </div>
          </main>
        </div>
        <Footer sponsors={false} />
      </div>
    </>
  );
};

export default Product;
