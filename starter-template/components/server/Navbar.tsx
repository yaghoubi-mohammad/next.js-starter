// app/components/Navbar.tsx (Server Component)
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const tl = useTranslations("Navbar.links");

  return (
    <div
      className="sticky top-0 z-50 bg-octa-dark-300 lg:bg-octa-dark-300/10 lg:backdrop-blur-lg"
      dir="ltr"
    >
      <nav className="relative lg:py-8 py-4">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="grid grid-cols-3 items-center">
            {/* Logo */}
            <Link href={"/"} className="justify-self-start">
              <Image
                src={"https://s3.octavia.ir/octavia-tech/logo-dark.png"}
                alt={t("logoAlt")}
                title={t("logoTitle")}
                width={170}
                height={20}
              />
            </Link>

            {/* Center links */}
            <div className="justify-self-center hidden lg:flex">
              <div className="flex gap-10 items-center px-6 py-3 rounded-full border border-octa-dark-50 rtl:flex-row-reverse">
                <Link className="text-white hover:text-gray-300" href="/about">
                  {tl("about")}
                </Link>
                <Link
                  className="text-white hover:text-gray-300"
                  href="/projects"
                >
                  {tl("projects")}
                </Link>
                <Link
                  className="text-white hover:text-gray-300"
                  href="/services"
                >
                  {tl("services")}
                </Link>
              </div>
            </div>

            {/* Contact btn + Mobile toggle */}
            <div className="justify-self-end">
              <div className="hidden lg:block">
                <Link href="/contact">
                  <button className="bg-white text-black py-2 px-4 rounded-full font-semibold">
                    {tl("contact")}
                  </button>
                </Link>
              </div>

              {/* Mobile menu toggle */}
              <div className="lg:hidden relative z-50">
                <input
                  type="checkbox"
                  id="menu-toggle"
                  className="peer hidden"
                />
                <label
                  htmlFor="menu-toggle"
                  className="cursor-pointer text-white p-2 inline-flex items-center"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </label>

                {/* Mobile menu */}
                <div className="absolute left-0 right-0 top-full bg-octa-dark-300 flex-col items-center gap-6 text-center py-8 transition-all duration-300 scale-y-0 peer-checked:scale-y-100 origin-top">
                  <Link
                    className="text-white hover:text-gray-300 block"
                    href="/about"
                  >
                    {tl("about")}
                  </Link>
                  <Link
                    className="text-white hover:text-gray-300 block"
                    href="/projects"
                  >
                    {tl("projects")}
                  </Link>
                  <Link
                    className="text-white hover:text-gray-300 block"
                    href="/services"
                  >
                    {tl("services")}
                  </Link>
                  <Link className="mt-4 inline-block" href="/contact">
                    <button className="bg-white text-black py-2 px-4 rounded-full font-semibold">
                      {tl("contact")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-octa-dark-50 to-transparent"></div>
      </nav>
    </div>
  );
};

export default Navbar;
