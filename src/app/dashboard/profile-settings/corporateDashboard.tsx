"use client";
import { TreeUserIcon } from "@/app/complete-info/(first-three-pages)/buyer-info/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboardIdentityContext } from "@/context/dashboardIdentity";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { FC, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import IndividualModal from "./individualModal";
import axios from "axios";
import { UserIdentity } from "./page";
import toast from "react-hot-toast";

interface CorporateDashboardProps {
  session: Session;
}

const CorporateDashboard: FC<CorporateDashboardProps> = ({ session }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isCorporateModalOpen, setIsCorporateModalOpen] = useState(false);
  const { userIdentity, setUserIdentity } = useDashboardIdentityContext();

  const handleChangeIdentityToHA = () => {
    setIsCorporateModalOpen(true);
  };

  const handleUpdateHOIdentity = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/update-dashboard/`,
        {
          user_type: "HO",
          organization: userIdentity?.organization,
          phone: userIdentity?.phone,
          bio: userIdentity?.bio,
          zipcode: userIdentity?.zipcode,
          email: userIdentity?.email,
          city: userIdentity?.city,
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

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <>
      <h1 className="text-2xl mb-4">تنظیمات پنل کاربری</h1>
      <div className="rounded-xl bg-white ">
        <br />
        <div className=" mx-4 sm:mx-24" dir="rtl">
          <div className="flex items-center gap-4 text-[#1F1F1F] font-semibold text-lg leading-6 mt-8 mb-4">
            <TreeUserIcon /> <span>مشخصات شرکت</span>
          </div>

          <div className="mr-4">
            <div className="md:flex gap-8">
              <div className="flex flex-col justify-center items-center md:items-start">
                <label
                  className="text-sm text-[#1F1F1F]"
                  htmlFor="factory-name"
                >
                  نام سازمان
                </label>
                <div>
                  <Input
                    className="my-3"
                    id="factory-name"
                    value={userIdentity?.organization || ""}
                    onChange={(e) =>
                      setUserIdentity((prev) => {
                        if (!prev) {
                          return undefined;
                        }
                        return { ...prev, organization: e.target.value };
                      })
                    }
                    type="text"
                    variant="default"
                    size="default"
                    placeholder="نام خود را وارد نمایید"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center md:items-start">
                <label
                  className="text-sm text-[#1F1F1F]"
                  htmlFor="corporate-phone2"
                >
                  شماره تماس
                </label>
                <div>
                  <Input
                    className="my-3"
                    id="corporate-phone2"
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
                <label
                  className="text-sm text-[#1F1F1F]"
                  htmlFor="corporate-email"
                >
                  ایمیل
                </label>
                <div>
                  <Input
                    className="my-3"
                    id="corporate-email"
                    type="email"
                    variant="default"
                    size="default"
                    placeholder="ایمیل خود را وارد کنید"
                    value={userIdentity?.email || ""}
                    onChange={(e) =>
                      setUserIdentity((prev) => {
                        if (!prev) {
                          return undefined;
                        }
                        return { ...prev, email: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center md:items-start">
                <label
                  className="text-sm text-[#1F1F1F]"
                  htmlFor="registration-number"
                >
                  شناسه ثبت
                </label>
                <div className="my-3">
                  <Input
                    id="registration-number"
                    type="email"
                    variant="default"
                    size="default"
                    placeholder="ایمیل خود را وارد کنید"
                    value={userIdentity?.zipcode || ""}
                    onChange={(e) =>
                      setUserIdentity((prev) => {
                        if (!prev) {
                          return undefined;
                        }
                        return { ...prev, zipcode: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                className="text-sm text-[#1F1F1F]"
                htmlFor="factory-description"
              >
                درباره شرکت
              </label>
              <div className="pt-2 mb-2 sm:mb-0">
                <div className="relative flex-1 overflow-hidden bg-[#EBEBEB] rounded-lg shadow-sm ring-1 ring-inset ring-gray-300">
                  <TextareaAutosize
                    style={{ direction: "rtl" }}
                    ref={textareaRef}
                    rows={1}
                    id="factory-description"
                    value={userIdentity?.bio || ""}
                    onChange={(e) =>
                      setUserIdentity((prev) => {
                        if (!prev) {
                          return undefined;
                        }
                        return { ...prev, bio: e.target.value };
                      })
                    }
                    placeholder={`لطفا درباره شرکت بنویسید...`}
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
              <button onClick={handleChangeIdentityToHA}>
                <span className="text-[#0B50AA] underline">
                  وارد کردن اطلاعات
                </span>{" "}
              </button>
            </div>
          </div>

          <div className="w-full flex justify-end mt-8">
            <Button
              disabled={loading}
              onClick={handleUpdateHOIdentity}
              className="md:w-44"
              variant={"green"}
              size={"resizble"}
            >
              ذخیره اطلاعات
              <CaretLeftIcon className="h-8 w-8" />
            </Button>
          </div>
          <br />
        </div>
        {isCorporateModalOpen && (
          <IndividualModal
            session={session}
            onClose={() => setIsCorporateModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default CorporateDashboard;
