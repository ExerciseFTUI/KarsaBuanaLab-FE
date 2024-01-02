"use client"

import Link from "next/link"
import React, { FC } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"

interface TopbarProps { }

function extractPageName(pathname: string) {
  const parts = pathname.split("/").filter((part) => part !== "")
  let final = ""

  if (!parts[1]) {
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + " / Dashboard"
  }

  for (let i = 0; i < parts.length; i++) {
    final +=
      parts[i].charAt(0).toUpperCase() +
      parts[i].slice(1) +
      (i == parts.length - 1 ? "" : " / ")
  }

  return final
}

const Topbar: FC<TopbarProps> = ({ }) => {
  const pathname = extractPageName(usePathname())

  const formattedPathname =
    pathname.split("-").length > 1
      ? pathname.split("-")[0] +
        " " +
        pathname.split("-")[1][0].toUpperCase() +
        pathname.split("-")[1].slice(1, pathname.split("-")[1].length)
      : pathname.split("-")[0]
  const extractedSecondPath = pathname.split(" / ")[1].split("-")
  const secondPath =
    extractedSecondPath.length > 1
      ? extractedSecondPath[0] + " " + extractedSecondPath[1]
      : extractedSecondPath[0]

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
      <div className="flex items-center gap-1">
        <div className="">
          <Avatar>
            <AvatarImage src="/assets/avatar2.png" />
            <AvatarFallback>RD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  )
}

export default Topbar
