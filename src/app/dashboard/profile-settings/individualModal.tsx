"use client";
import { provincesList } from "@/app/complete-info/(first-three-pages)/city-and-district/selectAddress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboardIdentityContext } from "@/context/dashboardIdentity";
import { validatePhoneNumber } from "@/helper/validateNumber";
import axios from "axios";
import { error } from "console";
import { Session } from "next-auth";
import { FC, useState } from "react";
import toast from "react-hot-toast";
interface IndividualModalProps {
  onClose: () => void; // Optional callback for closing the modal
  session: Session | null;
}

const IndividualModal: FC<IndividualModalProps> = ({ onClose, session }) => {
  const { setUserIdentity } = useDashboardIdentityContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");

  const [city, setCity] = useState("تهران");

  const handleChangeIdentityToHO = async () => {
    setLoading(true);

    const phoneResult = validatePhoneNumber(phone);
    if (phoneResult.error) {
      toast.error(phoneResult.error);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/update-dashboard/`,
        {
          user_type: "HA",
          phone: phoneResult.phone,
          city: city,
          username: username,
          email: email,
        },
        {
          headers: {
            Authorization: session?.access ? `Bearer ${session.access}` : "",
            TOKEN: session?.token || "",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        const data = response.data;
        setUserIdentity({
          city: data?.city,
          zipcode: data?.zipcode,
          user_type: "HA",
          organization: data?.organization,
          email: data?.email,
          bio: data?.bio,
          birthday: data?.birthday,
          phone: data?.phone,
          username: data?.username,
          first_last_name: data?.first_last_name,
        });
        console.log(data);
        toast.success("تغییرات شما با موفقیت ثبت گردید");
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.phone?.[0] === "phone already taken") {
          toast.error(
            "این سازمان قبلا استفاده ثبت نام شده لطفا سازمان دیگری را انتخاب کنید"
          );
        }
        if (
          error.response?.data?.email?.[0] === "Enter a valid email address."
        ) {
          toast.error("لطفا ایمیلی با فرمت درست وارد کنید", { duration: 7000 });
        }

        if (error.response?.data[0] === "email is not valid") {
          toast.error("لطفا ایمیلی با فرمت درست وارد کنید", { duration: 7000 });
        }
        toast.error("ثبت تغییرات شما با شکست مواجه شد لطفا دوباره امتحان کنید");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "modal-container" && onClose) {
      onClose(); // Call onClose only if it's provided
    }
  };

  return (
    <div
      id="modal-container"
      onClick={handleOutsideClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="justify-center flex items-center flex-col gap-5 mb-5">
          افزودن اطلاعات حقوقی
        </div>

        <div>
          <div>
            <label className="text-[#1F1F1F]" htmlFor="name">
              نام کاربری
            </label>
            <div className="my-3">
              <Input
                className="w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="name"
                type="text"
                variant="default"
                size="lg"
                placeholder="نام کاربری خود را وارد کنید"
              />
            </div>
          </div>
          <div>
            <label className="text-[#1F1F1F]" htmlFor="phone">
              شماره تماس
            </label>
            <div>
              <Input
                className="w-full my-3"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                variant="default"
                size="lg"
                placeholder="شماره تماس خود را وارد نمایید"
              />
            </div>
          </div>
          <div>
            <label className="text-[#1F1F1F]" htmlFor="email">
              ایمیل
            </label>
            <div>
              <Input
                className="w-full my-3"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                variant="default"
                size="lg"
                placeholder="ایمیل خود را وارد نمایید"
              />
            </div>
          </div>

          <div>
            <label htmlFor="province">استان</label>
            <select
              id="province"
              value={city}
              onChange={(e) => [
                setCity(e.target.value),
                // setCityName(""),
              ]}
              className="flex w-full py-3 items-center cursor-pointer px-1.5 text-sm mt-3 mb-4 border-2 border-[#A3A3A3] rounded"
            >
              {provincesList?.map((province) => (
                <option key={province.id} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          <Button
            disabled={loading}
            onClick={handleChangeIdentityToHO}
            style={{ direction: "rtl" }}
            variant={"green"}
            size={"lg"}
            className="w-full mb-2"
          >
            {loading ? "در حال تأیید..." : "ثبت و تایید"}
          </Button>
          <Button
            onClick={onClose}
            style={{ direction: "rtl" }}
            variant={"outline"}
            size={"lg"}
            className="w-full"
          >
            انصراف
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndividualModal;
