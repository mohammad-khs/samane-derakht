import { FC } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import Sponsors from "./sponsors";
import Link from "next/link";
interface FooterProps {
  sponsors?: boolean;
}

const Footer: FC<FooterProps> = ({ sponsors = true }) => {
  return (
    <>
      <footer>
        {sponsors && <Sponsors />}
        <div className="relative bg-[#20AC58] pt-10 pb-5">
          <div className="absolute bottom-0 left-0">
            <div className="relative w-36 h-36">
              <Image
                fill
                src={"/svgs/treesBottomLeftFooter.svg"}
                alt="bottom left trees in footer"
              />
            </div>
          </div>

          <div className="absolute bottom-0 right-0">
            <div className="relative w-40 h-40 md:w-48 md:h-48 lg:h-52 lg:w-52">
              <Image
                fill
                src={"/svgs/treesBottomRightFooter.svg"}
                alt="bottom right trees in footer"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row text-white px-10">
            <div className="basis-2/4 flex w-full gap-5 lg:gap-20 justify-center md:justify-end xl:justify-center z-0">
              <div className="flex flex-col">
                <h2 className="text-lg md:text-2xl font-semibold px-3 border-r-8 border-r-white">
                  نقشه سایت
                </h2>

                <div className="flex flex-col mt-8 h-full border-r-[3px] border-r-white border-opacity-20  p-4 font-semibold ">
                  <ul className="flex flex-col text-sm md:text-base gap-3">
                    <li>
                      <Link href={"/"}>صفحه خانه</Link>
                    </li>
                    <li>
                      <Link href={"/company/about-us"}>درباره ما</Link>
                    </li>
                    <li>
                      <Link href={"/products"}>محصولات</Link>
                    </li>
                    <li>
                      <Link href={"/watering-trees"}>آبیاری درختان</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg md:text-2xl font-semibold pr-3 border-r-8 border-r-white">
                  سوالات متداول
                </h2>
                <div className="flex flex-col h-full mt-8 border-r-[3px] border-r-white border-opacity-20  p-4 font-semibold ">
                  <ul className="flex flex-col text-sm md:text-base gap-3">
                    <li>
                      <Link href={"/company/faq"}>خرید محصول</Link>
                    </li>
                    <li>
                      <Link href={"/company/faq"}>بازگشت محصول</Link>
                    </li>
                    <li>
                      <Link href={"/company/faq"}>سوالات متدوال</Link>
                    </li>
                    <li>
                      <Link href={"/company/faq"}>نحوه ارسال</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="basis-2/5 flex flex-col mb-8 md:mb-0 items-center z-0">
              <div className="md:w-3/5">
                <h1 className="text-xl md:text-2xl font-semibold flex justify-end gap-3 mb-10 items-center">
                  <Link href="/" className=" text-lg font-semibold">
                    <div className="relative w-44 h-14">
                      <Image alt="logo" className="" fill src={`/logo.png`} />
                    </div>

                    <span className="sr-only">سامانه درخت</span>
                  </Link>
                </h1>
                <div className="w-full">
                  درخت من یک استارتاپ نوآورانه است که با هدف ترویج فرهنگ کاشت
                  درخت و حفاظت از محیط زیست تأسیس شده است. ما اعتقاد داریم که هر
                  درخت داستانی منحصر به فرد دارد و می‌تواند به زندگی ما معنا و
                  زیبایی ببخشد. هدف ما این است که به شما کمک کنیم تا این
                  داستان‌ها را زنده کنید و درختانی را در یاد و خاطره خود بکارید
                </div>
              </div>
            </div>
          </div>
          <div className="w-full  flex justify-center">
            <div className="w-full sm:w-3/5 text-xs mt-5 md:text-sm lg:text-base flex flex-col lg:flex-row justify-center md:justify-between z-0">
              <ul className="flex basis-2/5 justify-around items-center text-white">
                <li>
                  <FaTelegramPlane className="w-8 h-8" />
                </li>
                <li>
                  <a href="https://www.instagram.com/p/DIJyd4aPErn/?igsh=YWZtaWkycDhmcjFn">
                    <FaInstagram className="w-8 h-8 " />
                  </a>
                </li>
                <li>
                  <FaFacebookF className="w-8 h-8 " />
                </li>
                <li>
                  <a href="https://wa.me/+989308880854">
                    <FaWhatsapp className="w-8 h-8 " />
                  </a>
                </li>
                <li>
                  <FaYoutube className="w-8 h-8 " />
                </li>
              </ul>
              <div className="text-center my-2 mb-40 sm:mb-2">
                <span className="text-[#2C350D] font-semibold">
                  حقوق مادی و معنوی این سایت متعلق به
                </span>{" "}
                <span className="text-white">شرکت کاشت درخت</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
