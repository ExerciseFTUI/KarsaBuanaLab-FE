"use client";

import React, { FC } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { ClientResponses } from "@/lib/type";

interface CustomCheckboxProps {
  formLabel: string;
  items: ClientResponses[];
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ formLabel, items }) => {
  return (
    <div className="space-y-12 mt-4 m-10">
      <div className="space-y-0">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{`${formLabel}`}</h1>
          <div className="bg-[#bbbabf] w-full h-0.5 m-2" />
        </div>
        {items.map((item: ClientResponses) => (
          <div key={item.sample_name} className="flex flex-col space-y-4  ">
            <div className="absolute z-0 h-16 w-[1px] mx-3 bg-[#bbbabf]" />
            <div className="flex flex-row items-center space-x-3 space-y-0 z-10">
              <div>
                <Checkbox
                  className="h-6 w-6 bg-ghost_white cursor-default"
                  checked={item.status == "ACCEPTED" ? true : false}
                />
              </div>
              <div
                className={`text-lg font-normal ${
                  item.status ? "" : "text-moss_green"
                }`}
              >
                {item.sample_name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCheckbox;
