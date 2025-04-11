/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FaCoffee } from "react-icons/fa";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../client/LanguageSwitcher";

const Footer = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  const social = [
    {
      icon: <FaLinkedin />,
      link: "https://linkedin.com",
    },
    {
      icon: <FaXTwitter />,
      link: "https://x.com",
    },
  ];

  return (
    <>
      <div className="relative lg:py-8 py-4 bg-octa-dark-300 w-full max-w-screen-2xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 items-center">
          <div className="flex items-center gap-5">
            <LanguageSwitcher />
            <span className="max-lg:text-center text-xs text-octa-light-300 max-lg:order-last rtl:text-right ltr:text-left w-fit">
              {t("copyright", { year: currentYear })}
            </span>
          </div>

          <div className="justify-center items-center w-full flex">
            <Image
              src={"https://s3.octavia.ir/octavia-tech/logo-dark.png"}
              alt={t("logoAlt")}
              title={t("logoTitle")}
              width={170}
              height={20}
            />
          </div>

          <div className="flex items-center lg:justify-end justify-center gap-3">
            {social.map((item: any, index: number) => (
              <Link
                href={item.link}
                key={index}
                target="_blank"
                className="p-3 rounded-full text-white bg-octa-dark-100 hover:bg-octa-dark-50 transition-all"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-octa-dark-50 to-transparent"></div>
      </div>

      <div className="relative py-4 bg-octa-dark-300 w-full max-w-screen-2xl mx-auto px-6">
        <div
          className="flex gap-1 w-full text-xs text-octa-light-300 justify-center items-center"
          dir="ltr"
        >
          Develop whit
          <span className=" text-red-600">
            <FaHeart />
          </span>
          &
          <span className="text-yellow-800 text-red">
            <FaCoffee />
          </span>
          by
          <Link
            href={"https://nimajanbaz.dev?utm_source=octavia"}
            target="_blank"
            className="hover:text-octa-base-100 transition-all"
          >
            NimaJanbaz
          </Link>
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-octa-dark-50 to-transparent"></div>
      </div>
    </>
  );
};

export default Footer;
