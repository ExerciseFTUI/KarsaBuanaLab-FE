"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";

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
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === routeSection + link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-[#C2C5AA]"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                className="object-contain"
              />

              <p className="text-sm  max-sm:hidden">
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
