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

const dropdown = [
  {
    judul: "Tahap 1",
    placeholder: "Tahap 1",
    link: [
      {
        value: "link1",
        label: "link1",
      },
      {
        value: "link2",
        label: "link2",
      },
      {
        value: "link3",
        label: "link3",
      },
      {
        value: "link4",
        label: "link4",
      },
      {
        value: "link5",
        label: "link5",
      },
    ],
  },
  {
    judul: "Tahap 2",
    placeholder: "Tahap 2",
    link: [
      {
        value: "link1",
        label: "link1",
      },
      {
        value: "link2",
        label: "link2",
      },
      {
        value: "link3",
        label: "link3",
      },
      {
        value: "link4",
        label: "link4",
      },
      {
        value: "link5",
        label: "link5",
      },
    ],
  },
  {
    judul: "Tahap 3",
    placeholder: "Tahap 3",
    link: [
      {
        value: "link1",
        label: "link1",
      },
      {
        value: "link2",
        label: "link2",
      },
      {
        value: "link3",
        label: "link3",
      },
      {
        value: "link4",
        label: "link4",
      },
      {
        value: "link5",
        label: "link5",
      },
    ],
  },
  {
    judul: "Tahap 4",
    placeholder: "Tahap 4",
    link: [
      {
        value: "link1",
        label: "link1",
      },
      {
        value: "link2",
        label: "link2",
      },
      {
        value: "link3",
        label: "link3",
      },
      {
        value: "link4",
        label: "link4",
      },
      {
        value: "link5",
        label: "link5",
      },
    ],
  },
];

export default function Home() {
  const router = useRouter();
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full h-screen px-16 space-y-6">
      <div className="space-y-4">
        {dropdown.map((field, index) => (
          <div key={index} className="space-y-3">
            <h2>{field.judul}</h2>
            <Select
              onValueChange={(currentValue) => {
                if (currentValue === value) {
                  return;
                }
                window.open(currentValue, "_blank");
              }}
            >
              <SelectTrigger className="w-full justify-between border-moss_green rounded-xl p-6">
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {field.link.map((link) => (
                    <SelectItem key={link.value} value={link.value}>
                      {link.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}
