"use client";

import * as React from "react";
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
}

import { useRouter } from "next/navigation";

export default function DocumentTab({ data }:any) {
  const router = useRouter();
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full h-full px-16 space-y-6 ">
      <div className="space-y-4">
        {data.map((field:any, index:any) => (
          <div key={index} className="space-y-3">
            <h2>{`Tahap ${index + 1}`}</h2>
            <Select
              onValueChange={(currentValue) => {
                if (currentValue === value) {
                  return;
                }
                window.open(currentValue, "_blank");
              }}
            >
              <SelectTrigger className="w-full justify-between border-moss_green rounded-xl p-6">
                <SelectValue placeholder={field.name} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem key={field.url} value={field.url}>
                    {field.name}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}