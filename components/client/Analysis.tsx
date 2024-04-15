import React, { FC, useEffect, useState } from "react";
import CustomCheckbox from "../Checkbox/CustomCheckbox";
import { getAnalysisById } from "@/lib/actions/client.actions";
import { ClientResponses } from "@/lib/type";

interface AnalysisProps {
  data: ClientResponses[];
}

const Analysis: FC<AnalysisProps> = ({ data }) => {
  const hasRevision = data.some(item => item.status.includes("REVISION"));
  return (
    <div className="space-y-12 mt-4 m-10">
      <div className="space-y-0">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">
            Progress Analisa Sample ${hasRevision && "(Need Revision)"}
          </h1>
          <div className="bg-[#bbbabf] w-full h-0.5 m-2" />
        </div>
        <CustomCheckbox items={data ? data : []} />
      </div>
    </div>
  );
};

export default Analysis;
