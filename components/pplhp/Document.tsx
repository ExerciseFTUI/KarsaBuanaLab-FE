"use client";

import { useState, FC } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiShareBoxLine } from "react-icons/ri";

interface DocumentData {
  url: string;
  name: string;
  type: string;
}

interface DocumentProps {
  data: DocumentData[];
  color: String;
}

const Document: FC<DocumentProps> = ({ data, color }) => {
  const groupDataByType = (data: DocumentData[]) => {
    return data.reduce((acc, current) => {
      if (!acc[current.type]) {
        acc[current.type] = [current];
      } else {
        acc[current.type].push(current);
      }
      return acc;
    }, {} as Record<string, DocumentData[]>);
  };

  const groupedData = groupDataByType(data);

  return (
    <div className="space-y-14">
      {Object.entries(groupedData).map(([type, names]) => (
        <div key={type} className="space-y-5">
          <h1 className={`text-${color} text-xl font-semibold`}>{type}</h1>
          <div className="flex flex-wrap justify-between gap-2">
            {names.map((link) => (
              <a
                key={link.name}
                className={`flex flex-row bg-${color} rounded-xl p-4 w-full md:w-[48%] justify-between items-center`}
                href={link.url}
                target="_blank"
              >
                <p className="text-white text-sm">{link.name}</p>
                <RiShareBoxLine className="text-white text-3xl" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Document;
