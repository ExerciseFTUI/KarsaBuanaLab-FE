"use client";

import { sidebarLinks } from "@/constants/sidebarlinks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import { sidebarLinks } from "@/constants";

function extractFirstPathSegment(path: string) {
  // Remove leading and trailing slashes and split the path by "/"
  const segments = path.replace(/^\/|\/$/g, "").split("/");

  // Return the first segment
  return segments[0];
}

function Bottombar() {
  const pathname = usePathname();
  const routeSection = "/" + extractFirstPathSegment(pathname);

  return (
    <section className="fixed bottom-0 z-10 w-full rounded-t-3xl p-4 bg-white max-sm:px-7 lg:hidden ">
      <div className="flex items-center justify-between gap-3 max-sm:gap-5">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === routeSection + link.route;

          return (
            <Link
              href={routeSection + link.route}
              key={link.label}
              className={`relative flex flex-col items-center gap-1 max-w-[140px] rounded-lg p-2 hover:bg-light_green ease-in-out duration-300 sm:flex-1 sm:px-2 sm:py-2.5 ${
                isActive && "bg-light_green"
              }`}
            >
              {/* <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                className="object-contain"
              /> */}

              <div
                className={`text-2xl text-normal_green ${
                  isActive && "!text-dark_green"
                }`}
              >
                {link.icon}
              </div>

              <p
                className={`text-sm  max-sm:hidden text-normal_green  ${
                  isActive && "!text-dark_green font-semibold"
                }`}
              >
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
