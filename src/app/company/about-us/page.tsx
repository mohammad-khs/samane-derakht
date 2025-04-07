import React, { Suspense } from "react";
import {
  TelegramIcon,
  InstagramIcon,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  YoutubeIcon,
  CallIcon,
} from "../Icons";

import Image from "next/image";
import Video from "@/components/ui/video";
import { Loader2Icon, MapPin, Phone } from "lucide-react";

interface SocialMediaLinkProps {
  href: string;
  label: string;
  Icon: React.ComponentType;
}

const SocialMediaLink = ({ href, label, Icon }: SocialMediaLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="transition-all hover:scale-110"
  >
    <Icon />
  </a>
);

const ContactUs = () => {
  const socialLinks = [
    { href: "https://youtube.com", label: "YouTube", Icon: YoutubeIcon },
    { href: "https://twitter.com", label: "Twitter", Icon: TwitterIcon },
    { href: "https://whatsapp.com", label: "WhatsApp", Icon: WhatsappIcon },
    { href: "https://facebook.com", label: "Facebook", Icon: FacebookIcon },
    { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
    { href: "https://telegram.org", label: "Telegram", Icon: TelegramIcon },
  ];

  return (
    <>
      <div className="lg:relative lg:mt-14 w-full h-72 object-cover">
        <Image
          priority
          src="/svgs/company_headers/contactUsHeader.svg"
          width={0}
          height={0}
          alt="contact us header"
          className="w-full h-72 object-cover absolute -top-4 "
        />
      </div>
      <div className="md:container md:mx-auto md:pt-5 min-h-[65vh]">
        <main className="m-4 md:my-8 rounded-xl" dir="rtl">
          <div className="w-full text-black bg-white rounded-3xl p-7 md:p-14 font-sans">
            <div dir="ltr">
              <section className="flex flex-col md:flex-row justify-center items-center my-12">
                <div className="w-full flex justify-center">
                  <div className="w-full lg:w-10/12 border-2 p-3 rounded-[40px] shadow-2xl">
                    <Suspense fallback={<Loader2Icon />}>
                      <Video vidoAddress="/sampleVideo.mp4" />
                    </Suspense>
                  </div>
                </div>
                <div className="w-3/4 flex flex-col mt-10 md:mt-5 ms-10 gap-8 lg:ms-20 lg:mr-10">
                  <h1 className="relative flex justify-end items-center text-2xl md:text-xl lg:text-2xl xl:text-3xl">
                    <span className="mx-2">
                      <span>سامانه کاشت </span>
                      <span className="font-semibold">درخت آنلاین</span>
                    </span>
                    <div className="absolute -right-10">
                      <div className="relative">
                        <Image
                          src={"/svgs/verticalBranchWithLeaves.svg"}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                          alt="vertical Branch With Leaves"
                        />
                      </div>
                    </div>
                  </h1>
                  <div className="text-base font-semibold border-r-4 pr-3">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                    تکنولوژی مورد نیاز، و کاربردهای
                  </div>
                </div>
              </section>
            </div>

            <section>
              <p className="mb-14">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>

              <h3 className="flex items-center text-xl gap-2 mb-6">
                <CallIcon />
                راهای ارتباطی با ما
              </h3>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="text-white p-1 bg-[#8A8A8A] rounded-md" />
                  <span className="font-semibold">شماره تماس:</span>
                  <span>071-31234567&nbsp;&nbsp;&nbsp;&nbsp;071-31234567</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="text-white p-1 bg-[#8A8A8A] rounded-md" />
                  <span className="font-semibold">آدرس:</span>
                  <span>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center gap-8 pt-14">
                {socialLinks.map(({ href, label, Icon }, index) => (
                  <SocialMediaLink
                    key={index}
                    href={href}
                    label={label}
                    Icon={Icon}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default ContactUs;
