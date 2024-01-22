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
  const groupDataByType = (data: DocumentData[], typesToGroup: string[]) => {
    return typesToGroup.reduce((acc, type) => {
      const filteredData = data.filter(item => item.type === type);
      if (filteredData.length > 0) {
        acc[type] = filteredData;
      }
      return acc;
    }, {} as Record<string, DocumentData[]>);
  };

  const typesToGroup = ['Result', 'Preparation'];
  const groupedData = groupDataByType(data, typesToGroup);
  console.log(groupedData)

  return (
    <div className="space-y-14">
      {Object.entries(groupedData).map(([type, names]) => (
        <div key={type} className="space-y-5">
          <h1 className={`text-${color} text-xl`}>{type}</h1>
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
