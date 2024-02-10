"use client";

import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { DeadlineNotification } from "./sampling/DeadlineNotification";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import {
  EnvelopeOpenIcon,
  LockOpen1Icon,
  LockClosedIcon,
  PlusIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { UserType } from "@/lib/type";
import { DefaultSession } from "next-auth";
import { Session } from "next-auth";

interface TopbarProps {
  data?: Session | null;
}

function extractPageName(pathname: string) {
  const parts = pathname.split("/").filter((part) => part !== "");
  let final = "";

  if (!parts[1]) {
    return (
      parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + " / Dashboard"
    );
  }

  for (let i = 0; i < parts.length; i++) {
    final +=
      parts[i].charAt(0).toUpperCase() +
      parts[i].slice(1) +
      (i == parts.length - 1 ? "" : " / ");
  }

  return final;
}

const Topbar: FC<TopbarProps> = ({ data }) => {
  const pathname = extractPageName(usePathname());

  const { data: session } = useSession();

  console.log(data);

  const formattedPathname =
    pathname.split("-").length > 1
      ? pathname.split("-")[0] +
        " " +
        pathname.split("-")[1][0].toUpperCase() +
        pathname.split("-")[1].slice(1, pathname.split("-")[1].length)
      : pathname.split("-")[0];
  const extractedSecondPath = pathname.split(" / ")[1].split("-");
  const secondPath =
    extractedSecondPath.length > 1
      ? extractedSecondPath[0] + " " + extractedSecondPath[1]
      : extractedSecondPath[0];

  return (
    <nav className="flex w-full items-center justify-between px-2 py-6 ">
      <div className="flex flex-col items-start gap-1">
        {/* <Image src={"assets/logo.svg"} alt="logo" width={28} height={28} /> */}
        <p className="capilatize text-sm font-light text-moss_green">
          {formattedPathname}
        </p>
        <p className="text-2xl font-bold text-dark_green capitalize">
          {secondPath + (pathname.split(" / ")[2] ? " Details" : "")}
        </p>
      </div>
      <div className="flex items-center gap-8">
        {/* ===========================Admin Button */}

        {/* <div className="">
          {session?.user.role.toLowerCase() == "admin" &&
            pathname.split(" / ")[0] !== "Admin" && (
              <Link href="/admin">
                <Button variant={"outline"}>
                  <LockClosedIcon className="mr-2 h-4 w-4" /> Go to Admin Page
                </Button>
              </Link>
            )}
        </div> */}

        <div className="">
          {data?.user.role.toLowerCase() == "admin" &&
            pathname.split(" / ")[0] !== "Admin" && (
              <Link href="/admin">
                <Button variant={"outline"}>
                  <LockClosedIcon className="mr-2 h-4 w-4" /> Go to Admin Page
                </Button>
              </Link>
            )}
        </div>

        <div className="">
          {pathname.split(" / ")[0] == "Admin" &&
            pathname.split(" / ")[1] !== "Register" && (
              <Link href="/admin/register">
                <Button variant={"outline"}>
                  <PlusIcon className="mr-2 h-4 w-4" /> Add New User
                </Button>
              </Link>
            )}
        </div>
        {/* =========================== End Admin Button */}

        <div className="">
          {pathname.split(" / ")[0] == "Sampling" && <DeadlineNotification />}
        </div>

        <div className="max-md:hidden">
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
