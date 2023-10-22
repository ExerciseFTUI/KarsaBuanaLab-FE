"use client";

import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

interface TopbarProps {}

function extractPageName(pathname: string) {
  const parts = pathname.split("/");
  const cleanParts = parts.filter((part) => part !== "");

  if (!cleanParts[1]) {
    return "Dashboard";
  }

  return cleanParts[1].charAt(0).toUpperCase() + cleanParts[1].slice(1);
}

const Topbar: FC<TopbarProps> = ({}) => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full items-center justify-between px-2 py-6 ">
      <div className="flex flex-col items-start gap-1">
        {/* <Image src={"assets/logo.svg"} alt="logo" width={28} height={28} /> */}
        <p className="text-sm font-light text-normal_green">
          Pages / {extractPageName(pathname)}
        </p>
        <p className="text-2xl font-bold text-dark_green">
          {extractPageName(pathname)}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <div className="">
          <Avatar>
            <AvatarImage src="/assets/avatar2.png" />
            <AvatarFallback>RD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
