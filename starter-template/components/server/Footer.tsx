import Link from "next/link";
import { FaHeart, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FaCoffee } from "react-icons/fa";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../client/LanguageSwitcher";
import ThemeSwitcher from "../client/ThemeSwitcher";
import Logo from "../client/Logo";

type SocialItem = {
  icon: React.ReactNode;
  link: string;
  label: string;
};

const Footer = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  const social: SocialItem[] = [
    {
      icon: <FaLinkedin />,
      link: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <FaXTwitter />,
      link: "https://x.com",
      label: "X",
    },
  ];

  return (
    <footer className="bg-octa-dark-300 dark:bg-octa-light-50 w-full max-w-screen-2xl mx-auto">
      {/* بخش اصلی فوتر */}
      <div className="relative lg:py-8 py-4 px-6">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 items-center">
          {/* بخش چپ: LanguageSwitcher, ThemeSwitcher و کپی‌رایت */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <span className="text-xs font-persian text-octa-light-100 dark:text-octa-dark-200 max-lg:text-center max-lg:order-last rtl:text-right ltr:text-left">
              {t("copyright", { year: currentYear })}
            </span>
          </div>

          {/* بخش وسط: لوگو */}
          <div className="flex justify-center">
            <Logo />
          </div>

          {/* بخش راست: شبکه‌های اجتماعی */}
          <div className="flex items-center lg:justify-end justify-center gap-3">
            {social.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${item.label}`}
                className="p-3 rounded-full text-octa-light-100 dark:text-octa-dark-200 bg-octa-dark-100 dark:bg-octa-light-100 hover:bg-octa-dark-50 dark:hover:bg-octa-light-50 transition-colors"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* خط جداکننده */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-octa-dark-100 dark:via-octa-light-100 to-transparent" />
      </div>

      {/* بخش پایین: اعتبار توسعه‌دهنده */}
      <div className="relative py-4 px-6">
        <div
          className="flex items-center justify-center gap-1 text-xs font-persian text-octa-light-100 dark:text-octa-dark-200"
          dir="ltr"
        >
          Developed with
          <FaHeart className="text-red-500 mx-1" />
          &
          <FaCoffee className="text-yellow-700 mx-1" />
          by
          <Link
            href="https://nimajanbaz.dev?utm_source=octavia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-octa-base-100 dark:hover:text-octa-dark-50 transition-colors ml-1"
          >
            NimaJanbaz
          </Link>
          /
          <Link
            href="https://alexyaghoubi.dev?utm_source=octavia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-octa-base-100 dark:hover:text-octa-dark-50 transition-colors ml-1"
          >
            AlexYaghoubi
          </Link>
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-octa-dark-100 dark:via-octa-light-100 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;
