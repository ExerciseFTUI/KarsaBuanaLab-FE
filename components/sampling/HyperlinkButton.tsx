"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RiShareBoxFill } from "react-icons/ri"
import { cn } from "@/lib/utils"

interface hyperParam {
  title: string
  href: string
  className?: string
}

export default function HyperLinkButton({
  title,
  href,
  className = "",
}: hyperParam) {
  return (
    <Button
      asChild
      title={title}
      className={cn(
        "bg-light_brown font-light w-full flex justify-between hover:bg-dark_brown py-5 rounded-xl",
        className
      )}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <p className="font-medium">{title}</p>

        <RiShareBoxFill size={18} />
      </Link>
    </Button>
  )
}
