import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import { TreeData } from "@/types/products";
import { FC } from "react";
import TreeHeadInfo from "./treeheadInfo";
import Footer from "@/components/footer";
import MainCarousel from "@/components/main/mainCarousel";
import TreeMainInfo from "./treeMainInfo";
import NotFound from "./not-found";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface ProductProps {
  params: {
    productName: string;
  };
}

const Product: FC<ProductProps> = async ({ params }) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/api/tree/${params.productName}`,
    {
      headers: {
        Authorization: session?.access ? `Bearer ${session?.access}` : "",
        TOKEN: session?.token ?? "",
      },
    }
  );

  const data = await res.json();

  //this is the data that made app crash if i would have disabled cash

  const treeData: TreeData = {
    tree: data[0]?.tree,
    images: data[1]?.images,
    comments: data[2]?.comments,
    related: data[3]?.related,
    commnet_count: data[4]?.commnet_count,
    avg: data[5]?.avg,
    comment_offset: data[6]?.comment_offset,
    in_cart: data[7]?.in_cart,
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
              productId={treeData?.tree?.id}
              productSlug={params.productName}
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
