"use client";

import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopbarProps {}

const Topbar: FC<TopbarProps> = ({}) => {
  return (
    <nav className="flex w-full items-center justify-between px-2 py-6">
      <Link className="flex items-center gap-4" href={"/"}>
        {/* <Image src={"assets/logo.svg"} alt="logo" width={28} height={28} /> */}
        <p className="text-2xl font-bold">Dashboard</p>
      </Link>
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
