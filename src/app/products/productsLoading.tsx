import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface ProductsLoadingProps {}

const ProductsLoading: FC<ProductsLoadingProps> = () => {
  const length = Array(16).fill(0);
  return (
    <>
      <div className="grid lg:grid-cols-4 w-full h-full gap-4 mb-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {length.map((ignore, index) => {
          return (
            <div key={index} className="justify-center flex items-center">
              <Skeleton
                width={233}
                baseColor="#00000047"
                height={274}
                highlightColor="#D9D9D9"
                count={1}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductsLoading;
