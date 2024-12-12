import { FaShoppingCart, FaHeart, FaEnvelope, FaChartLine, FaTree, FaComments, FaWallet, FaUserCircle } from "react-icons/fa";

const DashboardSidebar = () => {
  return (
    <div className="flex flex-col items-center p-4 h-full">
      {/* User Profile Section */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gray-300 flex items-center justify-center">
          <FaUserCircle size={50} className="text-gray-600" />
        </div>
        <h2 className="text-lg font-bold mt-2">سید محمد امین حمیدی</h2>
        <p className="text-sm text-gray-500">09172173052</p>
      </div>
      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 w-full">
        {[
          { icon: <FaShoppingCart />, label: "سفارش‌ها" },
          { icon: <FaHeart />, label: "لیست علاقه‌مندی‌ها" },
          { icon: <FaEnvelope />, label: "پیام‌ها" },
          { icon: <FaChartLine />, label: "گزارش مالی" },
          { icon: <FaTree />, label: "درخت‌های من" },
          { icon: <FaComments />, label: "دیدگاه‌های من" },
          { icon: <FaWallet />, label: "برداشت مالی" },
          { icon: <FaUserCircle />, label: "صفحه اختصاصی" },
        ].map(({ icon, label }, index) => (
          <a
            key={index}
            href="#"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition px-4"
          >
            <span className="text-xl">{icon}</span>
            <span className="text-sm">{label}</span>
          </a>
        ))}
      </nav>
      {/* Footer Action */}
      <button className="mt-auto bg-green-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-700 transition">
        پشتیبانی و تیکت
      </button>
    </div>
  );
};

export default DashboardSidebar;
