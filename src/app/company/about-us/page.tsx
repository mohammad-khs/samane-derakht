import React from "react";
import {
  TelegramIcon,
  InstagramIcon,
  WhatsappIcon,
  TwitterIcon,
  YoutubeIcon,
  CallIcon,
} from "../Icons";

import Image from "next/image";
import {  MapPin, Phone } from "lucide-react";
import { EmailIcon } from "react-share";

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
    {
      href: `https://wa.me/+989308880854`,
      label: "WhatsApp",
      Icon: WhatsappIcon,
    },
    {
      href: "https://www.instagram.com/p/DIJyd4aPErn/?igsh=YWZtaWkycDhmcjFn",
      label: "Instagram",
      Icon: InstagramIcon,
    },
    { href: "https://telegram.org", label: "Telegram", Icon: TelegramIcon },
  ];

  return (
    <>
      <div className="lg:relative lg:mt-14 w-full h-72 object-cover">
        <Image
          priority
          src="/svgs/company_headers/aboutUsHeader.svg"
          width={0}
          height={0}
          alt="contact us header"
          className="w-full h-72 object-cover absolute -top-4 "
        />
      </div>
      <div className="md:container md:mx-auto md:pt-5 min-h-[65vh]">
        <main className="m-4 md:my-8 rounded-xl" dir="rtl">
          <div className="w-full text-black bg-white rounded-3xl p-7 md:p-14">
            <div dir="ltr">
              {/* <section className="flex flex-col md:flex-row justify-center items-center my-12">
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
              </section> */}
            </div> 

            <section>
              <div dir="rtl" className="  p-4 sm:p-8">
                <div className="   p-6 sm:p-8">
                  <header className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-green-800 border-b-2 border-green-500 pb-4">
                      به “درخت من” خوش آمدید!🌳
                    </h1>
                  </header>

                  <main className="space-y-8 ">
                    <h3 className="text-gray-600 text-justify leading-[1.8] text-lg font-semibold">
                      درخت من یک استارتاپ نوآورانه است که با هدف ترویج فرهنگ
                      کاشت درخت و حفاظت از محیط زیست تأسیس شده است. ما اعتقاد
                      داریم که هر درخت داستانی منحصر به فرد دارد و می‌تواند به
                      زندگی ما معنا و زیبایی ببخشد. هدف ما این است که به شما کمک
                      کنیم تا این داستان‌ها را زنده کنید و درختانی را در یاد و
                      خاطره خود بکارید.
                    </h3>
                    <section>
                      <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-4">
                        مأموریت ما
                      </h2>
                      <p className="text-gray-600 text-justify leading-[1.8]">
                        مأموریت ما ایجاد یک پلتفرم ساده و کاربرپسند برای کاشت
                        درختان به مناسبت‌های مختلف و یادبودهای خاص است. ما با
                        فراهم کردن امکان انتخاب درخت، تعیین محل کاشت، و ایجاد
                        تم‌های مختلف، به شما این امکان را می‌دهیم که درختی را به
                        یاد عزیزان خود بکارید و داستان آن را با دیگران به اشتراک
                        بگذارید.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-4">
                        چرا درخت؟
                      </h2>
                      <p className="text-gray-600 text-justify leading-[1.8]">
                        درختان نه تنها زیبایی طبیعت را افزایش می‌دهند، بلکه به
                        بهبود کیفیت هوا، کاهش آلودگی و ایجاد زیستگاه برای
                        موجودات زنده کمک می‌کنند. با کاشت درخت، شما به محیط زیست
                        کمک می‌کنید و در عین حال یک یادگاری ماندگار برای خود و
                        نسل‌های آینده خلق می‌کنید.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-4">
                        چگونه کار می‌کنیم؟
                      </h2>
                      <p className="text-gray-600 text-justify leading-[1.8]">
                        پس از انتخاب درخت و پر کردن اطلاعات خود، ما درخت را در
                        محل انتخابی شما می‌کاریم و یک{" "}
                        <span className="text-green-600 font-bold">
                          QR Code منحصر به فرد
                        </span>{" "}
                        برای داستان درخت شما طراحی می‌کنیم. این کد به شما و
                        دیگران این امکان را می‌دهد که با اسکن کردن آن، داستان
                        جذاب و احساسی شما را بخوانند و بشنوند. همچنین، ما
                        امکاناتی برای هدیه دادن و تعامل با دیگر کاربران فراهم
                        کرده‌ایم تا فضایی گرم و دوستانه ایجاد کنیم.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-4">
                        ما را دنبال کنید!
                      </h2>
                      <p className="text-gray-600 text-justify leading-[1.8] mb-6">
                        با پیوستن به “درخت من”، شما نه تنها به حفظ محیط زیست کمک
                        می‌کنید، بلکه به یک جامعه بزرگ از افرادی ملحق می‌شوید که
                        ارزش‌های مشابهی دارند. ما به دنبال ایجاد فضایی هستیم که
                        در آن کاربران بتوانند تجربیات خود را به اشتراک بگذارند و
                        از یکدیگر الهام بگیرند.
                      </p>
                    </section>
                  </main>

                  <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600 mb-2">
                      با احترام،
                      <br />
                      تیم <strong className="text-green-700">“درخت من”</strong>
                    </p>
                  </footer>
                </div>
              </div>

              <h3 className="flex items-center text-xl gap-2 mb-6">
                <CallIcon />
                راهای ارتباطی با ما
              </h3>

              <div>
                <div className="flex flex-col md:flex-row gap-2 mb-3">
                  <div className="flex gap-2 items-center">
                    <Phone className="text-white p-1 w-6 h-6 bg-[#8A8A8A] rounded-md" />
                    <span className="text-sm md:text-base font-semibold">
                      شماره تماس:
                    </span>
                  </div>
                  <span>071-91010696&nbsp;&nbsp;&nbsp;&nbsp;09308880854</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2 mb-3">
                  <div className="flex gap-2 items-center">
                    <EmailIcon className="text-white w-6 h-6 bg-[#8A8A8A] rounded-md" />
                    <span className="text-sm md:text-base font-semibold">
                      ایمیل:
                    </span>
                  </div>
                  <a
                    href="mailto:derakhtemanofficial@gmail.com"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    derakhtemanofficial@gmail.com
                  </a>
                </div>
                <div className="flex flex-col md:items-center md:flex-row gap-2  mb-3">
                  <div className="flex gap-2 items-center">
                    <MapPin className="text-white p-1 w-6 h-6 bg-[#8A8A8A] rounded-md" />
                    <span className="font-semibold">آدرس:</span>
                  </div>
                  <span className="text-sm">
                    بلوار مدرس، حدفاصل دانشگاه صنعتی شیراز و کارخانجات مخابراتی
                    ایران، بلوار آزادگان جنب دانشگاه علمی کاربردی
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center gap-3 md:gap-8 pt-14">
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
