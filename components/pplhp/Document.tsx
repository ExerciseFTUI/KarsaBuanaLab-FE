"use client"

import { useState, FC } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RiShareBoxLine } from "react-icons/ri";


interface DocumentLink {
  value: string;
  label: string;
}

interface DocumentData {
  judul: string;
  placeholder: string;
  link: DocumentLink[];
}


interface DocumentProps {
  data: DocumentData[];
  color: String;
}


const Document: FC<DocumentProps> = ({ data, color }) => {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-14">
      {data.map((tahap) => (
        <div className="space-y-5">
          <h1 className={`text-${color} text-lg font-semibold`}>{tahap.judul}</h1>
          <div className="flex flex-wrap justify-between gap-5">
            {tahap.link.map((link) => (
              <a className={`flex flex-row bg-${color} rounded-xl p-4 w-full md:w-[48%] justify-between items-center`} href={link.value} target="_blank">
                <p className="text-white text-sm">{link.label}</p>
                <RiShareBoxLine className="text-white text-3xl" />
              </a>
            ))}

          </div>
        </div>
      ))
      }
    </div>
  );
}
export default Document;
