"use client";

import React, { useState } from "react";
import SearchableDropdown from "./SearchableDropdown";
import TableRegulation from "./TableRegulation";
import Parameter from "./Parameters";
import { Sampling } from "@/lib/type";
import Link from "next/link";
import EditSample from "./EditSample";
import { NewSample } from "../addSample/NewSample";
import SelectCreateSample from "../addSample/SelectCreateSample";
import { BaseSample } from "@/lib/models/baseSample.model";

interface SamplingMarketingProps {
  baseSample: BaseSample[];
}

const CreateSamplePage = ({ baseSample }: SamplingMarketingProps) => {
  const [sample, setSample] = useState<string>("");
  const [regulation, setRegulation] = useState<number>(-1);
  const [listRegulation, setListRegulation] = useState([]);
  const [newSample, setNewSample] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 justify-between gap-6 max-md:flex-col max-md:items-center">
        {/* Information for sampling and regulation */}
        <div className="border border-dark_green rounded-lg p-5 h-full">
          <h1 className="text-xl font-semibold text-black mb-3">Sample</h1>

          {/* Dropdown Search and edit */}
          <div className="flex justify-center w-full items-center">
            <SearchableDropdown
              baseSample={baseSample}
              sample={sample}
              setSample={setSample}
            />
          </div>
          {/* End of Dropdown Search and edit */}

          {/* Regulations */}
          <div className="flex flex-col mt-10">
            <h1 className="text-black font-semibold text-lg mb-3">
              Regulation
            </h1>
            <div className="flex flex-row justify-center">
              <TableRegulation
                baseSample={baseSample}
                setListRegulation={setListRegulation}
                sample={sample}
                setRegulation={setRegulation}
              />
            </div>
          </div>
          {/* End of Regulations */}

          {/* Parameter */}
          <div className="flex flex-col mt-10">
            <h1 className="text-black font-semibold text-lg mb-3">Parameter</h1>
            <div className="flex flex-row justify-center">
              <Parameter
                bySample={false}
                regulation={regulation}
                baseSample={baseSample}
                sample={sample}
              />
            </div>
          </div>
          {/* End of Parameter */}
        </div>
        {/* End Information for sampling and regulation */}

        {/* Information for Edit */}
        <div className="border border-dark_green rounded-lg p-5 h-full">
          <h1 className="text-xl font-bold text-dark_green mb-10">
            List All Parameter for {sample.toUpperCase()} Sample{" "}
          </h1>
          <div className=" flex flex-row justify-center">
            <Parameter
              bySample={true}
              regulation={regulation}
              baseSample={baseSample}
              sample={sample}
            />
            {/* <EditSample sample={sample} regulation={regulation} /> */}
          </div>
        </div>
        {/* End Information for Parameter */}
      </div>
    </>
  );
};

export default CreateSamplePage;
