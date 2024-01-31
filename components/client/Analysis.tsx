import React, { FC, useEffect, useState } from "react";
import CustomCheckbox from "../Checkbox/CustomCheckbox";
import { getAnalysisById } from "@/lib/actions/client.actions";
import { ClientResponses } from "@/lib/type";

interface AnalysisProps {
  data: ClientResponses[];
}

const Analysis: FC<AnalysisProps> = ({ data }) => {
  return (
    <CustomCheckbox
      formLabel="Progress Analisa Sample"
      items={data ? data : []}
    />
  );
};

export default Analysis;
