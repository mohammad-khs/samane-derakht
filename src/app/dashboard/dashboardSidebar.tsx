import Link from "next/link";
import {
  FaShoppingCart,
  FaHeart,
  FaEnvelope,
  FaChartLine,
  FaTree,
  FaComments,
  FaWallet,
  FaUserCircle,
} from "react-icons/fa";

const DashboardSidebar = () => {
  return (
    <div className="flex flex-col items-center py-9 p-4 w-full h-full">
      {/* User Profile Section */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gray-300 flex items-center justify-center">
          <FaUserCircle size={50} className="text-gray-600" />
        </div>
        <h2 className="text-lg font-bold mt-2">سید محمد امین حمیدی</h2>
        <p className="text-sm text-gray-500">09172173052</p>
      </div>
      {/* Navigation Links */}
      <div className="h-full">
        <nav className="flex flex-col gap-4 w-full">
          {[
            {
              icon: <FaShoppingCart />,
              label: "سفارش‌ها",
              href: "/dashboard/orders",
            },
            {
              icon: <FaHeart />,
              label: "لیست علاقه‌مندی‌ها",
              href: "/dashboard/favorites",
            },
            { icon: <FaEnvelope />, label: "پیام‌ها", href: "" },
            {
              icon: <FaChartLine />,
              label: "گزارش مالی",
              href: "/dashboard/transactions",
            },
            {
              icon: <FaTree />,
              label: "درخت‌های من",
              href: "/dashboard/trees",
            },
            { icon: <FaComments />, label: "دیدگاه‌های من", href: "" },
            {
              icon: <FaWallet />,
              label: "برداشت مالی",
              href: "/dashboard/wallet",
            },
            { icon: <FaUserCircle />, label: "صفحه اختصاصی", href: "" },
          ].map(({ icon, label, href }, index) => (
            <Link
              key={index}
              className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition px-4"
              href={href}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </nav>
        {/* Footer Action */}
      </div>
      <Link href={"/dashboard/tickets"}>
        <button className="mt-auto bg-[#28D16C] text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition">
          پشتیبانی و تیکت
        </button>
      </Link>
    </div>
  );
};

export default DashboardSidebar;
