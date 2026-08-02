"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PersianDatePicker from "@/components/ui/persianDateInputs";
import { FC, useRef, useState } from "react";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import TextareaAutosize from "react-textarea-autosize";
import { useDashboardIdentityContext } from "@/context/dashboardIdentity";
import CorporateModal from "./corporateModal";
import { Session } from "next-auth";
import { fetcher } from "@/lib/utils";
import { UserIdentity } from "./page";
import toast from "react-hot-toast";
import TreeUserIcon from "@/components/ui/treeUserIcon";

interface IndividualDashboardProps {
  session: Session;
}

const IndividualDashboard: FC<IndividualDashboardProps> = ({ session }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { userIdentity, setUserIdentity } = useDashboardIdentityContext();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isCorporateModalOpen, setIsCorporateModalOpen] = useState(false);
  const handleChangeIdentity = () => {
    setIsCorporateModalOpen(true);
  };

  const handleUpdateHAIdentity = async () => {
    setLoading(true);
try {
      console.log(userIdentity?.first_last_name);
      const data = await fetcher(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/update-dashboard/`,
        "PUT"
      );

      console.log(data);
      const updatedData = data as UserIdentity;
      setUserIdentity({
        city: updatedData?.city,
        zipcode: updatedData?.zipcode,
        user_type: "HA",
        organization: updatedData?.organization,
        email: updatedData?.email,
        bio: updatedData?.bio,
        birthday: updatedData?.birthday,
        phone: updatedData?.phone,
        username: updatedData?.username,
        first_last_name: updatedData?.first_last_name,
        image: "",
      });
      toast.success("تغییرات شما با موفقیت ثبت گردید");
    } catch (error) {
      console.error("Error updating identity:", error);
      toast.error("ثبت تغییرات شما با شکست مواجه شد لطفا دوباره امتحان کنید");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl mb-4">تنظیمات پنل کاربری</h1>
      <div className="rounded-xl bg-white ">
        <br />
        <div className=" mx-4 sm:mx-24" dir="rtl">
          <div className="flex items-center gap-4 text-[#1F1F1F] font-semibold text-lg leading-6 mt-8 mb-4">
            <TreeUserIcon /> <span>مشخصات فردی </span>
          </div>

          <div className="mr-4">
            <div className="md:flex gap-8">
              <div className="flex flex-col justify-center items-center md:items-start">
                <label className="text-sm text-[#1F1F1F]" htmlFor="username">
                  نام کاربری
                </label>
                <div>
                  <Input
                    className="my-3 placeholder:text-xs"
                    id="username"
                    value={userIdentity?.username || ""}
                    onChange={(e) =>
                      setUserIdentity((prev) => {
                        if (!prev) {
                          return undefined;
                        }
                        return { ...prev, username: e.target.value };
                      })
                    }
                    type="text"
                    variant="default"
                    size="default"
                    placeholder="نام کاربری خود را وارد نمایید"
                  />
                </div>
              </div>
            </div>
            <div className="md:flex gap-8">
              <div className="flex flex-col justify-center items-center md:items-start">
                <label className="text-sm text-[#1F1F1F]" htmlFor="name">
                  نام و نام خانوادگی
                </label>
                <div>
                  <Input
                    className="my-3 placeholder:text-xs"
                    id="name"
                    value={userIdentity?.first_last_name || ""}
                    onChange={(e) =>
                      setUserIdentity((prev) => {
                        if (!prev) {
                          return undefined;
                        }
                        return { ...prev, first_last_name: e.target.value };
                      })
                    }
                    type="text"
                    variant="default"
                    size="default"
                    placeholder="نام و نام خانوادگی را وارد نمایید"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center md:items-start">
                <label className="text-sm text-[#1F1F1F]" htmlFor="phone2">
                  شماره تماس
                </label>
                <div>
                  <Input
                    className="my-3"
                    id="phone2"
                    type="text"
                    variant="default"
                    size="default"
                    placeholder="شماره تماس"
                    value={userIdentity?.phone || ""}
                    onChange={(e) =>
                      setUserIdentity((prev) => {
                        if (!prev) {
                          return undefined;
                        }
                        return { ...prev, phone: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="md:flex gap-8">
              <div className="flex flex-col justify-center items-center md:items-start">
                <label className="text-sm text-[#1F1F1F]" htmlFor="email">
                  ایمیل
                </label>
                <div>
                  <Input
                    value={userIdentity?.email || ""}
                    onChange={(e) =>
                      setUserIdentity((prev) => {
                        if (!prev) {
                          return undefined;
                        }
                        return { ...prev, email: e.target.value };
                      })
                    }
                    className="my-3"
                    id="email"
                    type="email"
                    variant="default"
                    size="default"
                    placeholder="ایمیل خود را وارد کنید"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center md:items-start">
                <label className="text-sm text-[#1F1F1F]" htmlFor="birthday">
                  تاریخ تولد
                </label>
                <div className="my-3">
                  <PersianDatePicker />
                </div>
              </div>
            </div>

            <div>
              <label
                className="text-sm text-[#1F1F1F]"
                htmlFor="tree-description"
              >
                بیوگرافی
              </label>
              <div className="pt-2 mb-2 sm:mb-0">
                <div className="relative flex-1 overflow-hidden bg-[#EBEBEB] rounded-lg shadow-sm ring-1 ring-inset ring-gray-300">
                  <TextareaAutosize
                    style={{ direction: "rtl" }}
                    ref={textareaRef}
                    rows={1}
                    id="tree-description"
                    value={userIdentity?.bio || ""}
                    onChange={(e) =>
                      setUserIdentity((prev) => {
                        if (!prev) {
                          return undefined;
                        }
                        return { ...prev, bio: e.target.value };
                      })
                    }
                    placeholder={`لطفا درباره خود بنویسید...`}
                    className="block w-full resize-none border-0 bg-transparent px-5 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:ring-transparent focus:outline-none py-1.5 sm:text-sm sm:leading-6"
                  />

                  <div
                    onClick={() => textareaRef.current?.focus()}
                    className="py-2"
                    aria-hidden="true"
                  >
                    <div className="py-px">
                      <div className="h-9" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-sm">
              آیا شما یک شخص حقوقی هستید ؟{" "}
              <button onClick={handleChangeIdentity}>
                <span className="text-[#0B50AA] underline">
                  وارد کردن اطلاعات
                </span>{" "}
              </button>
            </div>
          </div>

          <div className="w-full flex justify-end mt-8">
            <Button
              onClick={handleUpdateHAIdentity}
              className="md:w-44"
              variant={"green"}
              size={"resizble"}
              disabled={loading}
            >
              ذخیره اطلاعات
              <CaretLeftIcon className="h-8 w-8" />
            </Button>
          </div>
          <br />
        </div>
        {isCorporateModalOpen && (
          <CorporateModal
            session={session}
            onClose={() => setIsCorporateModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default IndividualDashboard;
