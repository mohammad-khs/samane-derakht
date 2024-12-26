"use client";
import { provincesList } from "@/app/complete-info/(first-three-pages)/city-and-district/selectAddress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboardIdentityContext } from "@/context/dashboardIdentity";
import axios from "axios";
import { Session } from "next-auth";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { UserIdentity } from "./page";

interface CorporateModalProps {
  onClose: () => void; // Optional callback for closing the modal
  session: Session | null;
}

const CorporateModal: FC<CorporateModalProps> = ({ onClose, session }) => {
  const { setUserIdentity } = useDashboardIdentityContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [organization, setOrganization] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("تهران");

  const handleChangeIdentityToHO = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/update-dashboard/`,
        {
          user_type: "HO",
          organization: organization,
          city: city,
          zipcode: zipcode,
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
        const data = response.data as UserIdentity;
        setUserIdentity({
          city: data?.city,
          zipcode: data?.zipcode,
          user_type: "HO",
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
        if (error.response?.data?.[0] === "organization already taken") {
          toast.error(
            "این سازمان قبلا استفاده ثبت نام شده لطفا سازمان دیگری را انتخاب کنید"
          );
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
      onClose();
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
            <label className="text-[#1F1F1F]" htmlFor="factory-name">
              نام سازمان
            </label>
            <div>
              <Input
                className="w-full my-3"
                id="factory-name"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                type="text"
                variant="default"
                size="lg"
                placeholder="نام سازمان خود را وارد نمایید"
              />
            </div>
          </div>
          <div>
            <label className="text-[#1F1F1F]" htmlFor="registration-number">
              شناسه ثبت
            </label>
            <div className="my-3">
              <Input
                className="w-full"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                id="registration-number"
                type="text"
                variant="default"
                size="lg"
                placeholder="شناسه ثبت شرکت را وارد کنید"
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

export default CorporateModal;
