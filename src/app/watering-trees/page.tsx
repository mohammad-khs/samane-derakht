"use client";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import WateringTreesSection from "./wateringTreesSection";

interface WateringTreesProps {}

const WateringTrees: FC<WateringTreesProps> = () => {
  const [activeButton, setActiveButton] = useState<"waiting" | "finished">(
    "waiting"
  );
  const [finishedData, setFinishedData] = useState([]);
  const [waitingdata, setWaitingData] = useState([]);
  const [loading, setLoading] = useState(false);

//   const fetchFinishedOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/myorders/`,
//         {
//           headers: {
//             Authorization: `Bearer ${session?.access}`,
//             TOKEN: session?.token,
//           },
//         }
//       );
//       if (response.status === 200) {
//         setFinishedData(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching Orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWaitingOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/myorders/`,
//         {
//           params: {
//             NP: true,
//           },
//           headers: {
//             Authorization: `Bearer ${session?.access}`,
//             TOKEN: session?.token,
//           },
//         }
//       );
//       if (response.status === 200) {
//         setWaitingData(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching Orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFinishedOrders();
//     fetchWaitingOrders();
//   }, []);

  if (loading) {
    return (
      <div className="w-full h-full justify-center items-center flex">
        <Loader2 className="animate-spin w-20 h-20 text-[#28D16C]" />
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-3 pb-1 border-b-2 border-[#A3A3A3] mb-4 relative">
        <button
          className={`relative pb-1 ${
            activeButton === "waiting"
              ? "after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[3px] after:bg-green-500"
              : "text-[#5F6368]"
          }`}
          onClick={() => setActiveButton("waiting")}
        >
          <div className="flex gap-1 justify-center items-center">
            در انتظار آبیاری{" "}
            <div
              className={`flex justify-center items-center text-xs leading-6 text-white rounded-md px-[4px] ${
                activeButton === "waiting" ? "bg-[#28D16C]" : "bg-[#D9D9D9]"
              }`}
            >
              <div
                className={`flex justify-center items-center text-xs leading-6 text-white rounded-md px-[4px] ${
                  activeButton === "waiting" ? "bg-[#28D16C]" : "bg-[#D9D9D9]"
                }`}
              >
                {waitingdata.length}
              </div>
            </div>
          </div>
        </button>
        <button
          className={`relative pb-1 ${
            activeButton === "finished"
              ? "after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[3px] after:bg-green-500"
              : "text-[#5F6368]"
          }`}
          onClick={() => setActiveButton("finished")}
        >
          <div className="flex gap-1 justify-center items-center">
            آبیاری انجام شده{" "}
            <div
              className={`flex justify-center items-center text-xs leading-6 text-white rounded-md px-[4px] ${
                activeButton === "finished" ? "bg-[#28D16C]" : "bg-[#D9D9D9]"
              }`}
            >
              {finishedData.length}
            </div>
          </div>
        </button>
      </div>

      {activeButton === "finished" ? (
        <WateringTreesSection isWaitingData={false} data={finishedData} />
      ) : (
        <WateringTreesSection isWaitingData={true} data={waitingdata} />
      )}
    </>
  );
};

export default WateringTrees;
