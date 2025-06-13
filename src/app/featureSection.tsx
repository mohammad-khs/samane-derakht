import Image from "next/image";

interface FeatureSectionProps {
  all: number;
  air: number;
  green_land: number;
}

const fetchTreeData = async (): Promise<FeatureSectionProps> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tree_data/`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tree data");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching map data:", error);
    return { air: 0, all: 0, green_land: 0 };
  }
};

const FeatureSection = async () => {
  const data = await fetchTreeData();

  return (
    <>
      <section className="relative mx-5 md:mx-10">
        <div className="absolute -z-10 -left-9 md:-left-9 bottom-0">
          <div className="relative w-32 h-28 md:w-28 md:h-36">
            <Image
              src={
                "/svgs/main_feature_section/treeBottomLeftFeatureSection.svg"
              }
              alt="left Tree Our Feature Seciton"
              fill
            />
          </div>
        </div>
        <div className="absolute z-10 left-0 bottom-0">
          <div className="relative">
            <Image
              src={
                "/svgs/main_feature_section/rockBottomLeftFeatureSection.svg"
              }
              alt="left Tree Our Feature Seciton"
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <div className="absolute z-10 right-0 md:-right-10 bottom-0">
          <div className="relative w-36 h-36 md:w-56 md:h-56">
            <Image
              src={"/svgs/main_feature_section/rightTreeOurFeatureSection.svg"}
              alt="right Tree Our Feature Seciton"
              fill
            />
          </div>
        </div>

        <div className="relative  flex flex-col mx-10 xl:flex-row overflow-hidden">
          <div className="absolute left-[5vw] md:left-[10vw] bottom-16  md:bottom-28  rounded-full  bg-white opacity-10 w-[30vw] h-[30vw]"></div>
          <div className="absolute right-[5vw] md:right-[10vw] top-16 md:top-28 rounded-full  bg-white opacity-10 w-[30vw] h-[30vw]"></div>

          <div className="basis-2/4   bg-[#E6E6E6] rounded-t-3xl xl:rounded-tr-none p-3 md:p-10">
            <div className="flex flex-col z-20  w-full h-full gap-4 justify-around md:flex-row ">
              <div className="flex flex-col h-full sm:flex-row md:flex-col md:justify-start w-full items-center">
                <div className="relative mx-5 md:mx-0 rounded-lg my-2 xl:mt-20 xl:mb-5 bg-white w-24 h-24">
                  <Image
                    src={"/svgs/main_feature_section/sixteenKindOfTrees.svg"}
                    fill
                    alt={`${data.air} نوع درخت`}
                    className="p-1"
                  />
                </div>
                <p
                  className="text-center mx-auto md:mx-0  md:ml-0 text-lg font-semibold md:text-base"
                  style={{ direction: "rtl" }}
                >
                  {data.air} نوع درخت
                </p>
              </div>
              <div className="h-[70%] mt-4 border-r-[3px] hidden sm:block rounded-lg  border-[#B9B9B9]" />
              <div className="flex flex-col h-full sm:flex-row md:flex-col md:justify-start w-full   items-center">
                <div className="relative mx-5 md:mx-0 rounded-lg my-2 xl:mt-20 xl:mb-5 bg-white w-24 h-24">
                  <Image
                    src={"/svgs/main_feature_section/wholeCountry.svg"}
                    fill
                    alt="ارسال به سراسر کشور"
                    className="p-1"
                  />
                </div>
                <p className="text-center mx-auto md:mx-0 md:ml-0 text-lg font-semibold md:text-base">
                  ارسال به سراسر کشور
                </p>
              </div>
              <div className="h-[70%] mt-4 border-r-[3px] hidden sm:block rounded-lg  border-[#B9B9B9]" />
              <div className="flex flex-col h-full sm:flex-row md:flex-col md:justify-start w-full   items-center">
                <div className="relative mx-5 md:mx-0 rounded-lg my-2 xl:mt-20 xl:mb-5 bg-white w-24 h-24">
                  <Image
                    src={"/svgs/storySvgs/nature.svg"}
                    fill
                    alt={`بیش از ${data.green_land} درخت کاشته شده`}
                    className="p-1"
                  />
                </div>
                <p className="text-center mx-auto md:mx-0 md:ml-0 text-lg font-semibold md:text-base">
                  بیش از {data.green_land} درخت کاشته شده
                </p>
              </div>
            </div>
          </div>
          <div className="basis-2/4  justify-center xl:justify-normal  flex mr-auto items-center rounded-b-3xl xl:rounded-tr-3xl md:rounded-b-none text-white bg-[#20AC58] p-8 md:p-6 xl:p-10">
            <div className="w-full sm:w-3/5 xl:w-5/6 mb-32 sm:mb-5 z-20">
              <h1 className="font-semibold text-2xl md:text-xl mb-10 lg:text-2xl xl:text-3xl">
                ویژگی های برتر شرکت ما
              </h1>
              <div className="leading-7 text-sm font-semibold">
                شرکت &quot;درخت من&quot; با ترویج کاشت درختان و حفاظت از محیط زیست،
                تجربه‌ای منحصر به فرد و شخصی برای کاربران فراهم می‌کند. امکان
                انتخاب تم‌های مختلف برای درختان به مناسبت‌های خاص و اشتراک‌گذاری
                داستان‌های شخصی، این تجربه را جذاب‌تر می‌کند. استفاده از QR کد
                برای هر درخت، امکان ارتباط احساسی بیشتری با طبیعت ایجاد می‌کند.
                همچنین، کاربران می‌توانند از طریق کیف پول دیجیتال به دیگران هدیه
                دهند و تجربه‌ای اجتماعی را رقم بزنند. خدمات اضافی مثل ارسال
                ویدیو و پیام صوتی، ارتباط عمیق‌تری با درختان فراهم می‌آورد.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
