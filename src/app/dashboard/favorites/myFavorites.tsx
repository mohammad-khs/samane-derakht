"use client";
import { Session } from "next-auth";
import { FC} from "react";

interface MyFavoritesProps {
  session: Session;
}

const MyFavorites: FC<MyFavoritesProps> = ({ session }) => {
  return <>favorites</>;

  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState();
  // const fetchFinishedOrders = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/favorites/`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${session?.access}`,
  //           TOKEN: session?.token,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       setData(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching Orders:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchFinishedOrders();
  // }, []);
  // if (loading) {
  //   return (
  //     <div className="w-full h-full justify-center items-center flex">
  //       <Loader2 className="animate-spin w-20 h-20 text-[#28D16C]" />
  //     </div>
  //   );
  // }
  // return (
  //   <>
  //     <div
  //       key={item.id}
  //       className="mb-2 p-3 rounded-md bg-gray-100 flex flex-col md:flex-row  md:justify-between items-center"
  //     >
  //       <div className="text-sm">
  //         مبلغ:{" "}
  //         <span className="text-base">
  //           {formatNumberWithCommas(item.final_price)}
  //         </span>{" "}
  //         تومان
  //       </div>
  //       <Button
  //         className="flex items-center"
  //         size={"resizble"}
  //         variant={"lightGray"}
  //       >
  //         <Trash2 />
  //       </Button>
  //       <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
  //         <div className=" flex">
  //           <div className="relative w-[148px] h-[100px]  border-2 rounded-lg border-[#D2D2D2]">
  //             {item.tree_type.image ? (
  //               <Image
  //                 src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.tree_type.image}`}
  //                 alt={`عکس درخت ${item.tree_type.image}`}
  //                 fill
  //                 className="rounded-lg"
  //               />
  //             ) : (
  //               <div className=" w-full h-full">{FallbackImage()}</div>
  //             )}
  //           </div>
  //         </div>
  //         <div>
  //           <div>
  //             <span>نهال درخت {item.tree_type.name}</span>{" "}
  //             <span className="text-[#247C48] underline text-xs">
  //               <Link href={`/products/${item?.tree_type.slug}`}>
  //                 مشاهده محصول
  //               </Link>
  //             </span>
  //           </div>
  //           <div className="text-sm text-center mt-2 sm:text-start">تعداد:</div>
  //         </div>
  //       </div>
  //     </div>
  // </>
  // );
};

export default MyFavorites;
