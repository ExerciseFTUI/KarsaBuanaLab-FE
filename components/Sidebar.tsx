"use client";

import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
// import { sidebarLinks } from "@/constants";
import { BiLogOut } from "react-icons/bi";
import { sidebarLinks } from "@/constants/sidebarlinks";
import { signOut } from "next-auth/react";

function extractFirstPathSegment(path: string) {
  // Remove leading and trailing slashes and split the path by "/"
  const segments = path.replace(/^\/|\/$/g, "").split("/");
  // Return the first segment
  return segments[0];
}

interface LeftSidebarProps {}

const Sidebar: FC<LeftSidebarProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const routeSection = "/" + extractFirstPathSegment(pathname);
  //   const { userId } = useAuth();

  return (
    <section className="custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto shadow-md pb-5  max-lg:hidden ">
      <div className="px-6 py-8">
        <div className="flex items-center justify-center  border-b pb-6">
          <Image
            src={"/assets/logo.png"}
            alt={"Logo"}
            width={180}
            height={180}
          />
        </div>
      </div>

      <div className="flex flex-1 w-full flex-col gap-3 px-3">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === routeSection + link.route;
          //   if (link.route === "/profile") link.route = `/profile/${userId}`;

          return (
            <Link
              href={routeSection + link.route}
              key={link.label}
              className={`relative hover:bg-light_green ease-in-out duration-300 flex justify-start items-center gap-4 rounded-lg p-4 ${
                isActive && "bg-light_green"
              }`}
            >
              {/* <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                className=""
              /> */}

              <div
                className={`text-2xl text-normal_green ${
                  isActive && "!text-dark_green"
                }`}
              >
                {link.icon}
              </div>

              <p
                className={`text-sm text-normal_green  ${
                  isActive && "!text-dark_green font-semibold"
                }`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-2">
        <div
          className="flex gap-3 cursor-pointer p-4 items-center rounded-lg hover:bg-[#C2C5AA] "
          onClick={() => signOut()}
        >
          {/* <Image
                src={"assets/logout.svg"}
                alt="logout"
                width={24}
                height={24}
              /> */}

          <BiLogOut className={"text-[30px] text-normal_green"} />
          <p className="text-sm text-normal_green max-lg:hidden">Log Out</p>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
