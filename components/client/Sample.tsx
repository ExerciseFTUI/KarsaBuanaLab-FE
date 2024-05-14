"use client";
import React, { FC, useEffect, useState } from "react";
import CustomCheckbox from "../Checkbox/CustomCheckbox";
import axios from "axios";
import { getSampleById } from "@/lib/actions/client.actions";
import { ClientResponses } from "@/lib/type";

interface SampleProps {
  data: ClientResponses[];
  setEnabled: (enabled: boolean) => void;
}

const Sample: FC<SampleProps> = ({ data, setEnabled }) => {
  setEnabled(data.every((item) => item.status === "ACCEPTED"));
  return (
    <div className="space-y-12 mt-4 m-10">
      <div className="space-y-0">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Sampling Progress</h1>
          <div className="bg-[#bbbabf] w-full h-0.5 m-2" />
        </div>
        <CustomCheckbox items={data ? data : []} />
      </div>
    </div>
  );
};

export default Sample;
